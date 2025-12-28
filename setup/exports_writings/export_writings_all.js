// ## Script pour exporter tout le code
// Racine > setup > exports_writings > Créer export_writings_all.js

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFileName = "export_writings_all.md";
const outputPath = path.join(__dirname, outputFileName);

const excludedPaths = [
	"node_modules",
	"build",
	"dist",
	"client/dist",
	"server/dist",
	"logs",
	".vscode",
	".idea",
	".vite",
	"client/.vite",
	".git",
	"setup",
	"exports_writings",
];

const excludedFiles = [".DS_Store", "npm-debug.log", outputFileName];
const excludedExtensions = [
	".tsbuildinfo",
	".log",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".ico",
	".pdf",
	".zip",
];

function detectLanguage(file) {
	const ext = path.extname(file).slice(1).toLowerCase();
	const map = {
		js: "javascript",
		ts: "typescript",
		sh: "bash",
		css: "css",
		html: "html",
		py: "python",
		json: "json",
		yml: "yaml",
		tsx: "tsx",
		md: "markdown",
	};
	return map[ext] || "";
}

function isExcluded(filePath) {
	const normalized = filePath.replace(/\\/g, "/");
	return (
		excludedPaths.some(
			(folder) =>
				normalized.includes(`/${folder}/`) ||
				normalized.split("/").includes(folder),
		) ||
		excludedFiles.some((name) => path.basename(normalized) === name) ||
		excludedExtensions.some((ext) => normalized.endsWith(ext))
	);
}

function isBinary(buffer) {
	let nonAscii = 0;
	const length = Math.min(buffer.length, 1000);
	for (let i = 0; i < length; i++) {
		if (buffer[i] > 127) nonAscii++;
	}
	return buffer.length > 0 && nonAscii / length > 0.3;
}

function getAllFiles(dir) {
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		return entries.flatMap((entry) => {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (isExcluded(fullPath)) return [];
				return getAllFiles(fullPath);
			}
			return fullPath;
		});
	} catch (_err) {
		return [];
	}
}

try {
	console.log(
		`\n=========================\n🔵 EXPORT GLOBAL\n=========================\n`,
	);

	let output = "# CONTENU DU PROJET\n";
	const projectRoot = process.cwd();

	console.log(`🔵 Analyse des fichiers dans : ${projectRoot}...`);

	const allFiles = getAllFiles(projectRoot)
		.filter(
			(f) =>
				fs.existsSync(f) &&
				path.basename(f) !== outputFileName &&
				path.basename(f) !== path.basename(__filename) &&
				!isExcluded(f),
		)
		.sort();

	console.log(
		`🔵 ${allFiles.length} fichiers trouvés. Génération du Markdown...`,
	);

	for (const file of allFiles) {
		const relPath = path.relative(projectRoot, file);
		const lang = detectLanguage(file);
		const raw = fs.readFileSync(file);
		if (isBinary(raw)) {
			output += `\n### \`${relPath}\`\n⚠️ **Fichier ignoré (binaire)**\n`;
			continue;
		}
		output += `\n### \`${relPath}\`\n\`\`\`${lang}\n${raw.toString("utf8")}\n\`\`\`\n`;
	}

	fs.writeFileSync(outputPath, output, "utf8");

	console.log(`🟢 EXPORT RÉUSSI : ${outputFileName} créé.`);
	console.log(`🔵 Emplacement : setup/exports_writings/`);
	console.log(`\n-------------------------\n`);
} catch (error) {
	console.error(`\n🔴 ERREUR lors de l'export :`, error.message);
	console.log(`\n-------------------------\n`);
}
// ## Commande Bash pour executer le script :
// node setup/exports_writings/export_writings_all.js
