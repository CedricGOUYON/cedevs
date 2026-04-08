// npx tsx setup/update-package-name.ts
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const rootFolderName = path.basename(path.resolve());
console.log(`
=========================
🔵 AUTO-CONFIG PROJECT
=========================
`);
console.log(`🔵 Dossier racine détecté : ${rootFolderName}`);

const constantsPath = path.resolve("setup/constants.ts");
if (fs.existsSync(constantsPath)) {
	let content = fs.readFileSync(constantsPath, "utf8");
	const appName = rootFolderName
		.replace(/([a-z])([A-Z0-9])|([0-9])([a-zA-Z])/g, "$1$3 $2$4")
		.trim()
		.replace(/\s+/g, " ");
	const folderName = rootFolderName.toLowerCase().replace(/[^\w]/g, "_").replace(/_+/g, "_");
	if (content.includes("PENDING_FOLDER_NAME") || content.includes("PENDING_APP_NAME")) {
		content = content.replace(/PENDING_APP_NAME/g, appName);
		content = content.replace(/PENDING_FOLDER_NAME/g, folderName);
		fs.writeFileSync(constantsPath, content);
		console.log(`🟢 constants.ts mis à jour : ROOT_FOLDER_NAME=${folderName} | APP_NAME=${appName}`);
	} else {
		console.log(`🔵 constants.ts — aucun remplacement nécessaire`);
	}
} else {
	console.log("🔴 Erreur : constants.ts introuvable");
}

function generateJWTSecret(): string {
	return crypto.randomBytes(32).toString("hex");
}

function updateEnv(envPath: string): void {
	if (!fs.existsSync(envPath)) return;
	const relativePath = path.relative(process.cwd(), envPath).replace(/\\/g, "/");
	const original = fs.readFileSync(envPath, "utf8");
	const lines = original.split("\n");
	let hasChanges = false;
	const folderName = path.basename(path.resolve()).toLowerCase().replace(/[^\w]/g, "_").replace(/_+/g, "_");
	const appName = path
		.basename(path.resolve())
		.replace(/([a-z])([A-Z0-9])|([0-9])([a-zA-Z])/g, "$1$3 $2$4")
		.trim()
		.replace(/\s+/g, " ");
	const updatedLines = lines.map((line) => {
		if (line.startsWith("JWT_SECRET=PENDING_JWT_SECRET")) {
			const jwtSecret = generateJWTSecret();
			console.log(`   JWT_SECRET : "PENDING_JWT_SECRET" → "${jwtSecret}"`);
			hasChanges = true;
			return `JWT_SECRET=${jwtSecret}`;
		}
		if (line.startsWith("VITE_APP_NAME=PENDING_APP_NAME")) {
			console.log(`   VITE_APP_NAME : "PENDING_APP_NAME" → "${appName}"`);
			hasChanges = true;
			return `VITE_APP_NAME=${appName}`;
		}
		if (!line.includes("PENDING_FOLDER_NAME")) return line;
		const [key] = line.split("=");
		const newLine = line.replace(/PENDING_FOLDER_NAME/g, folderName);
		console.log(`   ${key} : PENDING_FOLDER_NAME → ${folderName}`);
		hasChanges = true;
		return newLine;
	});
	if (hasChanges) {
		const updated = updatedLines.join("\n");
		fs.writeFileSync(envPath, updated);
		console.log(`🟢 ${relativePath} mis à jour`);
	} else {
		console.log(`🔵 ${relativePath} — aucun remplacement nécessaire`);
	}
}

updateEnv(path.resolve("server/.env"));
updateEnv(path.resolve("web/.env"));
updateEnv(path.resolve(".env"));
console.log(`
=========================
🟢 CONFIGURATION TERMINÉE
=========================
`);
