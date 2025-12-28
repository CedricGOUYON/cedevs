import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDB(): Promise<void> {
	try {
		const schemaPath = path.resolve(
			__dirname,
			"../../database/script/schema.sql",
		);

		const schema = readFileSync(schemaPath, "utf-8");
		const client = await db.connect();

		try {
			await client.query(schema);
			console.log(
				`🟢 Base de données "${process.env.DB_NAME}" : Structure créée ou mise à jour.`,
			);
		} finally {
			client.release();
		}
	} catch (err: unknown) {
		const error = err as Error;
		console.error("🔴 Erreur SQL détaillée :", error.message);
		throw error;
	}
}
