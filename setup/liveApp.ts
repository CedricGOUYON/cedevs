// npx tsx setup/liveApp.ts
import "dotenv/config";
import { type ExecSyncOptions, execSync, spawn } from "node:child_process";

// ---------------------------------------------------------
// Configuration
// ---------------------------------------------------------
const CONFIG = {
	dockerPath: '"C:/Program Files/Docker/Docker/Docker Desktop.exe"',
	dockerWaitAttempts: 40,
	dockerWaitInterval: 3000,
	dockerStartDelay: 12000,
	dbWaitAttempts: 40,
	dbWaitInterval: 2500,
	dbInitScript: "npm run db:init",
} as const;

const DEBUG = process.env.DEBUG === "1";

// ---------------------------------------------------------
// Processus enfants à nettoyer au CTRL+C
// ---------------------------------------------------------
const childProcesses: (ReturnType<typeof spawn> | null)[] = [];

const cleanExit = () => {
	console.log("\n\n🔴 Interruption reçue — arrêt propre des processus...");
	for (const child of childProcesses) {
		if (child && !child.killed) {
			try {
				child.kill("SIGTERM");
			} catch {}
		}
	}
	process.exit(0);
};

process.on("SIGINT", cleanExit);
process.on("SIGTERM", cleanExit);

// ---------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------
type LogLevel = "info" | "success" | "warn" | "error" | "debug";

const COLORS = {
	info: "\x1b[34m",
	success: "\x1b[32m",
	warn: "\x1b[33m",
	error: "\x1b[31m",
	debug: "\x1b[90m",
	reset: "\x1b[0m",
};

function log(message: string, level: LogLevel = "info") {
	if (level === "debug" && !DEBUG) return;
	console.log(`${COLORS[level]}${message}${COLORS.reset}`);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function run(cmd: string, opts: ExecSyncOptions = {}): void {
	log(`▶ ${cmd}`, "debug");
	execSync(cmd, {
		stdio: "inherit",
		shell: "cmd.exe",
		...opts,
	});
}

function tryRun(cmd: string, opts: ExecSyncOptions = {}): boolean {
	try {
		log(`▶ ${cmd}`, "debug");
		execSync(cmd, {
			stdio: "ignore",
			shell: "cmd.exe",
			...opts,
		});
		return true;
	} catch {
		return false;
	}
}

// ---------------------------------------------------------
// Étapes du Pipeline (Fiabilité renforcée)
// ---------------------------------------------------------

async function killPorts(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 0");
	console.log("🔵 Nettoyage des ports et services...");

	const execute = (cmd: string) => {
		try {
			execSync(cmd, { stdio: "ignore", shell: "cmd.exe" });
		} catch {}
	};

	const services = ["postgresql-x64-16", "postgresql-x64-15", "pgadmin4"];
	for (const service of services) {
		execute(`net stop ${service} /y`);
	}

	const processNames = ["postgres.exe", "pgAdmin4.exe", "docker-proxy.exe"];
	for (const name of processNames) {
		execute(`taskkill /F /IM ${name} /T`);
	}

	const ports = [5432, 5050];
	for (const port of ports) {
		try {
			const stdout = execSync(`netstat -ano | findstr :${port}`, {
				encoding: "utf8",
			});
			const pids = stdout
				.split("\n")
				.map((line) => line.trim().split(/\s+/).pop())
				.filter((pid) => pid && !Number.isNaN(Number(pid)) && pid !== "0");

			for (const pid of pids) {
				execute(`taskkill /F /T /PID ${pid}`);
				log(`🟢 Port ${port} libéré`, "success");
			}
		} catch {}
	}

	log("🟢 Nettoyage terminé.", "success");
	await sleep(1000);
}

async function cleanDockerStep(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 1");
	console.log("🔵 Nettoyage des processus Docker...");

	try {
		execSync("docker ps", { stdio: "ignore" });

		log("🔵 Docker détecté, lancement du nettoyage profond...", "info");

		try {
			execSync("docker stop $(docker ps -q)", { stdio: "ignore", shell: "sh" });
		} catch {}

		execSync("docker system prune -a --volumes -f", { stdio: "ignore" });
		log("🟢 Environnement réinitialisé", "success");
	} catch {
		log("🟡 Docker Desktop n'est pas actif. Le nettoyage ignoré.", "warn");
		log("🔵 Note : Docker sera démarré à l'étape suivante.", "info");
	}
}

async function startDocker(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 2");
	console.log("🔵 Démarrage de Docker Desktop...");
	tryRun(`start "" ${CONFIG.dockerPath}`);
	log("🔵 Initialisation en cours...", "info");
}

async function repairWSL(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 2.fix");
	console.log("🔵 Réparation forcée du moteur WSL...");
	tryRun("wsl --shutdown");
	await sleep(2000);
	tryRun("wsl --unregister docker-desktop");
	tryRun("wsl --unregister docker-desktop-data");
	await sleep(2000);
	tryRun("wsl --update");
	log("🔵 WSL a été mis à jour et réinitialisé", "info");
	await sleep(3000);
	await startDocker();
}

async function waitForDocker(isRetry = false): Promise<void> {
	if (!isRetry) {
		console.log("══════════════════════════════════════════════════");
		console.log("Étape 3");
	}
	console.log("🔵 Vérification de l'état de Docker...");

	for (let i = 0; i < CONFIG.dockerWaitAttempts; i++) {
		try {
			execSync("docker version", { stdio: "ignore", shell: "cmd.exe" });
			log("🟢 Docker est opérationnel !", "success");

			console.log("🔵 Libération des ports et purge du cache réseau...");
			try {
				execSync("docker compose down --remove-orphans -v", {
					stdio: "ignore",
					shell: "cmd.exe",
				});

				execSync("docker network prune -f", {
					stdio: "ignore",
					shell: "cmd.exe",
				});

				const criticalPorts = [5432, 5050];
				for (const port of criticalPorts) {
					const containerId = execSync(`docker ps -q --filter "publish=${port}"`, {
						encoding: "utf8",
						shell: "cmd.exe",
					}).trim();

					if (containerId) {
						log(`🔵 Parasite détecté sur port ${port} (${containerId}). Fermeture...`, "info");
						execSync(`docker stop ${containerId}`, {
							stdio: "ignore",
							shell: "cmd.exe",
						});
						execSync("docker network prune -f", {
							stdio: "ignore",
							shell: "cmd.exe",
						});
					}
				}

				log("🟢 Réseaux et ports nettoyés avec succès.", "success");
			} catch {
				log("🟡 Nettoyage partiel (certains éléments étaient déjà libres).", "warn");
			}

			return;
		} catch {
			log(`🟡 Docker en attente (${i + 1}/${CONFIG.dockerWaitAttempts})`, "warn");
			await sleep(CONFIG.dockerWaitInterval);
		}
	}
	if (!isRetry) {
		log("\n🔵 Docker ne répond pas. Tentative de réparation WSL...", "error");
		await repairWSL();
		return waitForDocker(true);
	}

	log("🔴 Échec critique : Docker ne peut pas démarrer.", "error");
	process.exit(1);
}

async function buildProject(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 4");
	console.log("🔵 Compilation des applications...");
	run("npm run build -w web");
	log("🟢 Builds terminés avec succès", "success");
}

async function startContainers(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 5");
	console.log("🔵 Déploiement des conteneurs...");
	run("docker compose up -d --build");
	log("🟢 Services démarrés", "success");
}

async function waitForDB(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 6");
	console.log("🔵 Attente de la base de données...");
	const PROJECT_NAME = process.env.PROJECT_NAME;
	if (!PROJECT_NAME) {
		log("🔴 PROJECT_NAME manquant dans le .env", "error");
		process.exit(1);
	}

	const container = `${PROJECT_NAME}_db`;
	for (let i = 0; i < CONFIG.dbWaitAttempts; i++) {
		if (tryRun(`docker exec ${container} pg_isready`)) {
			log("🟢 PostgreSQL est prêt à accepter les connexions !", "success");

			log("🔵 Stabilisation de la base de données...", "info");
			await sleep(3000);
			return;
		}
		log(`🟡 Base de données indisponible (${i + 1}/${CONFIG.dbWaitAttempts})`, "warn");
		await sleep(CONFIG.dbWaitInterval);
	}
	process.exit(1);
}

async function startDev(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("Étape 7");
	console.log("🔵 Lancement de l'environnement Dev");

	const spawnService = (name: string, cmd: string) => {
		log(`\n🔵 [${name}] Démarrage...`, "info");
		const proc = spawn("cmd.exe", ["/c", cmd], {
			stdio: "inherit",
			detached: false,
		});
		childProcesses.push(proc);
		return proc;
	};

	spawnService("Web", "npm run dev -w web");
	const server = spawnService("Server", "npm run dev -w server");

	await new Promise<void>((resolve, reject) => {
		server.on("exit", (code) => {
			if (code === 0 || code === null) resolve();
			else reject(new Error(`Le serveur s'est arrêté brusquement (code ${code})`));
		});
	});
}

async function main(): Promise<void> {
	console.log("══════════════════════════════════════════════════");
	console.log("🔵 LAUNCHER — liveApp");
	console.log("   Simulator live Local");

	const start = Date.now();

	try {
		await killPorts();
		await cleanDockerStep();
		await startDocker();
		await waitForDocker();
		await buildProject();
		await startContainers();
		await waitForDB();

		log("🔵 Initialisation du schéma de données...", "info");
		run(CONFIG.dbInitScript);

		const totalTime = ((Date.now() - start) / 1000).toFixed(1);
		log(`\n🟢 Pipeline validé en ${totalTime}s`, "success");

		await startDev();
	} catch (err) {
		log(`\n🔴 ERREUR PIPELINE : ${err instanceof Error ? err.message : err}`, "error");
		process.exit(1);
	}
}
main();
