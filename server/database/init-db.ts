import pg from "pg";
import "dotenv/config";
import { initDB } from "../services/db/initDB.js";

const { Client } = pg;

async function run() {
	const config = {
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: "localhost",
		port: 5433,
		database: "postgres",
	};

	const targetDb = process.env.DB_NAME;
	const client = new Client(config);

	try {
		await client.connect();
		const res = await client.query(
			"SELECT 1 FROM pg_database WHERE datname = $1",
			[targetDb],
		);

		if (res.rowCount === 0) {
			console.log(`🔵 Base "${targetDb}" absente. Création...`);
			await client.query(`CREATE DATABASE "${targetDb}"`);
			console.log(`🟢 Base "${targetDb}" créée.`);
		}
		await client.end();
		await initDB();
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error("🔴 Erreur Init Script :", err.message);
		} else {
			console.error("🔴 Erreur Init Script : Une erreur inconnue est survenue");
		}
		process.exit(1);
	}
}

run();
