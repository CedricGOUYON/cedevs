// ## Script pour exporter les fichiers non suivi par git
// Racine > setup > exports_writings > Créer export_writings_noCommit.js

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const selfName = path.basename(__filename);

const outputFileName = "export_writings_noCommit.md";
const outputPath = path.join(__dirname, outputFileName);

function detectLanguage(file) {
	const ext = path.extname(file).slice(1);
	const map = {
		js: "javascript",
		ts: "typescript",
		sh: "bash",
		css: "css",
		html: "html",
		json: "json",
		md: "markdown",
		tsx: "tsx",
	};
	return map[ext] || "";
}

try {
	console.log(
		`\n=========================\n🔵 EXPORT NO-COMMIT\n=========================\n`,
	);

	console.log(`🔵 Analyse des fichiers modifiés et non suivis...`);

	const modifiedFiles = execSync("git diff --name-only", { encoding: "utf8" })
		.split("\n")
		.filter(
			(f) => f && fs.existsSync(f) && f !== outputFileName && f !== selfName,
		);

	const untrackedFiles = execSync("git ls-files --others --exclude-standard", {
		encoding: "utf8",
	})
		.split("\n")
		.filter(
			(f) => f && fs.existsSync(f) && f !== outputFileName && f !== selfName,
		);

	let output = "## FICHIERS À MODIFIER\n";
	if (modifiedFiles.length > 0) {
		console.log(`🔵 ${modifiedFiles.length} fichier(s) modifié(s) trouvé(s).`);
		for (const file of modifiedFiles) {
			output += `\n### \`${file}\`\n\`\`\`${detectLanguage(file)}\n${fs.readFileSync(file, "utf8")}\n\`\`\`\n`;
		}
	} else {
		output += "\n_Aucun fichier modifié._\n";
	}

	output += "\n## NOUVEAUX FICHIERS\n";
	if (untrackedFiles.length > 0) {
		console.log(
			`🔵 ${untrackedFiles.length} nouveau(x) fichier(s) détecté(s).`,
		);
		for (const file of untrackedFiles) {
			output += `\n### \`${file}\`\n\`\`\`${detectLanguage(file)}\n${fs.readFileSync(file, "utf8")}\n\`\`\`\n`;
		}
	} else {
		output += "\n_Aucun fichier non suivi._\n";
	}

	fs.writeFileSync(outputPath, output, "utf8");

	console.log(`🟢 EXPORT RÉUSSI : ${outputFileName} généré.`);
	console.log(`🔵 Emplacement : setup/exports_writings/`);
	console.log(`\n-------------------------\n`);
} catch (error) {
	console.error(`\n🔴 ERREUR lors de l'export noCommit :`, error.message);
	console.log(`\n-------------------------\n`);
}

// ## Commande Bash pour executer le script :
// node setup/exports_writings/export_writings_noCommit.js
