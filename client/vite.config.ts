import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, "../"), "");

	const projectName = env.DB_NAME || "DefaultProject";
	const apiPort = env.SERVER_PORT || 3310;
	const clientPort = Number(env.CLIENT_PORT) || 5173;

	console.log("\n=========================================");
	console.log("🔵 SECTION : CLIENT FRONTEND");
	console.log("=========================================");
	console.log(`🔵 MODE    : ${mode}`);
	console.log(`🔵 PROJECT : ${projectName}`);
	console.log(`🟢 API URL : http://localhost:${apiPort}/api`);
	console.log("🟢 Configuration Vite chargée.\n");

	return {
		plugins: [react()],
		server: {
			port: clientPort,
			proxy: {
				"/api": {
					target: env.VITE_API_URL || `http://localhost:${apiPort}`,
					changeOrigin: true,
				},
			},
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
