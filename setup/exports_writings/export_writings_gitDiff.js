// ## Script pour exporter les différences de Git
// Racine > setup > exports_writings > Créer export_writings_gitDiff.js

import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFileName = "export_writings_gitDiff.md";
const outputPath = path.join(__dirname, outputFileName);

console.log(
	`\n=========================\n🔵 GIT DIFF EXPORT\n=========================\n`,
);
console.log(`🔵 Analyse des changements non commités...`);

exec("git diff", (err, stdout) => {
	if (err) {
		console.error(`🔴 ERREUR lors du git diff :`, err.message);
		return;
	}

	if (!stdout) {
		console.log(`🔵 Aucun changement détecté dans le code.`);
		stdout = "Aucune différence détectée (git diff vide).";
	}

	const markdown = `# Git Diff - ${new Date().toLocaleString()}\n\n\`\`\`diff\n${stdout}\n\`\`\`\n`;

	fs.writeFile(outputPath, markdown, "utf8", (writeErr) => {
		if (writeErr) {
			console.error(`🔴 ERREUR d'écriture du fichier :`, writeErr.message);
		} else {
			console.log(`🟢 EXPORT RÉUSSI : ${outputFileName} généré.`);
			console.log(`🔵 Emplacement : setup/exports_writings/`);
			console.log(`\n-------------------------\n`);
		}
	});
});
// ## Commande Bash pour executer le script :
// node setup/exports_writings/export_writings_gitDiff.js
