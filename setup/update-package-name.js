import fs from "node:fs";
import path from "node:path";

const rootFolderName = path.basename(path.resolve());

console.log(
	`\n=========================\n🔵 AUTO-CONFIG PROJECT\n=========================\n`,
);
console.log(`🔵 Dossier racine détecté : ${rootFolderName}`);

const constantsPath = path.resolve("setup/constants.ts");

if (fs.existsSync(constantsPath)) {
	console.log(`🔵 Analyse de ${constantsPath}...`);
	let constantsContent = fs.readFileSync(constantsPath, "utf8");

	if (constantsContent.includes("PENDING_GENERATION")) {
		constantsContent = constantsContent.replace(
			/PENDING_GENERATION/g,
			rootFolderName,
		);
		fs.writeFileSync(constantsPath, constantsContent);
		console.log(`🟢 constants.ts mis à jour avec le nom : ${rootFolderName}`);
	} else {
		console.log(
			`🔵 constants.ts est déjà à jour (aucune mention 'PENDING_GENERATION').`,
		);
	}
} else {
	console.log("🔴 Erreur : Fichier constants.ts introuvable dans /setup");
}

function updateEnv(envPath) {
	const fileName = path.basename(envPath);
	const dirName = path.dirname(envPath).split(path.sep).pop() || "root";

	if (fs.existsSync(envPath)) {
		console.log(`🔵 Mise à jour de : ${dirName}/${fileName}...`);
		let envContent = fs.readFileSync(envPath, "utf8");

		if (/PGDATABASE=/.test(envContent)) {
			envContent = envContent.replace(
				/PGDATABASE=.*/,
				`PGDATABASE=${rootFolderName}`,
			);
		} else {
			envContent += `\nPGDATABASE=${rootFolderName}`;
		}

		fs.writeFileSync(envPath, envContent);
		console.log(
			`🟢 ${fileName} (${dirName}) mis à jour avec PGDATABASE=${rootFolderName}`,
		);
	} else {
		console.log(`🔴 Fichier non trouvé : ${dirName}/${fileName}`);
	}
}

console.log(`\n🔵 Mise à jour des fichiers d'environnement...`);
updateEnv(path.resolve("server/.env"));
updateEnv(path.resolve("client/.env"));
updateEnv(path.resolve(".env"));

console.log(
	`\n=========================\n🟢 CONFIGURATION TERMINÉE\n=========================\n`,
);
