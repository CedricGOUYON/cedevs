import pg from "pg";

const { Pool } = pg;

const host = process.env.PGHOST || "localhost";

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD || ""}@${host}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE}`;

const pool = new Pool({
	connectionString,
});

pool.on("error", (err) => {
	console.error("🔴 Erreur inattendue sur le pool PostgreSQL :", err.message);
});

export default pool;
