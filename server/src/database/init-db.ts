import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, "../../database/script/schema.sql");
const sql = fs.readFileSync(schemaPath, "utf8");

// ── Docker ────────────────────────────────────────────
await new Promise<void>((resolve, reject) => {
	console.log("\n=========================================");
	console.log("🔵 DOCKER");
	console.log("=========================================");

	try {
		const result = execSync("docker compose ps --format json", {
			encoding: "utf8",
		});
		const containers = result
			.trim()
			.split("\n")
			.filter(Boolean)
			.map((l) => JSON.parse(l));
		const allHealthy = containers.length > 0 && containers.every((c) => c.Health === "healthy" || c.State === "running");
		if (allHealthy) {
			for (const c of containers) console.log(`🟢 ${c.Name} déjà actif`);
			console.log("=========================================\n");
			return resolve();
		}
	} catch {}

	const proc = spawn("docker", ["compose", "up", "-d", "--wait"], {
		stdio: ["inherit", "pipe", "pipe"],
	});

	proc.stdout?.on("data", (data: Buffer) => {
		const lines = data
			.toString()
			.split("\n")
			.filter((l) => l.trim());
		for (const line of lines) {
			if (line.includes("✔") || line.includes("Healthy") || line.includes("Running")) {
				const name = line
					.replace(/[✔✗[\]]/g, "")
					.replace(/Healthy|Running|Started/g, "")
					.trim()
					.split(" ")[0];
				console.log(`🟢 ${name} prêt`);
			}
		}
	});

	proc.on("close", (code: number) => {
		if (code === 0) {
			console.log("🟢 Tous les conteneurs sont prêts");
			console.log("=========================================\n");
			resolve();
		} else {
			console.error("🔴 Erreur lors du démarrage Docker");
			console.log("=========================================\n");
			reject(new Error("Docker failed"));
		}
	});
});

// ── Init BDD ──────────────────────────────────────────
console.log("\n=========================================");
console.log("🔵 INIT BASE DE DONNÉES");
console.log("=========================================");

const pghost = process.env.PGHOST || "localhost";
const pgport = Number(process.env.PGPORT) || 5432;
const pguser = process.env.POSTGRES_USER;
const pgpass = process.env.POSTGRES_PASSWORD;
const pgdb = process.env.PGDATABASE;

if (!pguser || !pgpass || !pgdb) {
	console.error("🔴 Variables d'environnement manquantes (POSTGRES_USER, POSTGRES_PASSWORD, PGDATABASE)");
	process.exit(1);
}

console.log(`Connexion : ${pguser}@${pghost}:${pgport}/${pgdb}`);

const initPool = new Pool({
	host: pghost,
	port: pgport,
	user: pguser,
	password: pgpass,
	database: pgdb,
});

const IGNORE_CODES = new Set(["42710", "42P07", "42701", "42P06"]);

interface PgError extends Error {
	code: string;
}

function isPgError(err: unknown): err is PgError {
	return err instanceof Error && "code" in err;
}

function splitSql(rawSql: string): string[] {
	const statements: string[] = [];
	let current = "";
	let inDollarQuote = false;
	let dollarTag = "";
	let i = 0;

	while (i < rawSql.length) {
		if (!inDollarQuote && rawSql[i] === "$") {
			const end = rawSql.indexOf("$", i + 1);
			if (end !== -1) {
				const tag = rawSql.slice(i, end + 1);
				inDollarQuote = true;
				dollarTag = tag;
				current += tag;
				i = end + 1;
				continue;
			}
		} else if (inDollarQuote && rawSql.startsWith(dollarTag, i)) {
			current += dollarTag;
			i += dollarTag.length;
			inDollarQuote = false;
			dollarTag = "";
			continue;
		}

		if (!inDollarQuote && rawSql[i] === ";") {
			const trimmed = current.trim();
			if (trimmed.length > 0) statements.push(trimmed);
			current = "";
			i++;
			continue;
		}

		current += rawSql[i];
		i++;
	}

	const trimmed = current.trim();
	if (trimmed.length > 0) statements.push(trimmed);

	return statements;
}

const client = await initPool.connect();
try {
	const statements = splitSql(sql);

	for (const statement of statements) {
		try {
			await client.query(statement);
		} catch (err) {
			if (isPgError(err) && IGNORE_CODES.has(err.code)) {
				console.warn(`🟡  Ignoré (déjà existant) : ${err.message}`);
			} else {
				throw err;
			}
		}
	}
	console.log("🟢 Schéma appliqué avec succès.");
} catch (err) {
	console.error("🔴 Erreur lors de l'initialisation :", err);
	process.exit(1);
} finally {
	client.release();
	await initPool.end();
	console.log("🟢 Connexion fermée.");
	console.log("=========================================\n");
}
