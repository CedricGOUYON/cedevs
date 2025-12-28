import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const db = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
});

console.log(`\n=========================`);
console.log(`🔵 DB SERVICE INIT`);
console.log(`=========================`);
console.log(`🔵 DATABASE : ${process.env.DB_NAME}`);
console.log(`🔵 HOST     : ${process.env.DB_HOST}:${process.env.DB_PORT}`);
console.log(`🟢 POOL     : Connecté avec ${process.env.DB_USER}`);
console.log(`-------------------------\n`);
