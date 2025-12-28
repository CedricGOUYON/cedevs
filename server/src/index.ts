import cors from "cors";
import "dotenv/config";
import express from "express";
import { db } from "../services/db/index.js";
import { initDB } from "../services/db/initDB.js";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = process.env.SERVER_PORT || 3310;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use("/api", apiRoutes);

db.query("SELECT 1")
	.then(async () => {
		try {
			await initDB();
			app.listen(PORT, () => {
				console.log("\n=========================================");
				console.log("🔵 SECTION : SERVER BACKEND");
				console.log("=========================================");
				console.log(`🟢 DATABASE : CONNECTED`);
				console.log(`🟢 SERVER   : http://localhost:${PORT}`);
				console.log(`🔵 CLIENT   : ${CLIENT_URL}\n`);
			});
		} catch (err: unknown) {
			const error = err as Error;
			console.error("🔴 Erreur initialisation tables :", error.message);
			process.exit(1);
		}
	})
	.catch((err: unknown) => {
		const error = err as Error;
		console.error("\n=========================================");
		console.error("🔴 ERREUR CRITIQUE DATABASE");
		console.error(`Détail technique : ${error.message}`);
		console.error("=========================================\n");
		process.exit(1);
	});
