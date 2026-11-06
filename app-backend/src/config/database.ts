import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: env.DB_POOL_MAX,
  idleTimeoutMillis: env.DB_IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: env.DB_CONNECTION_TIMEOUT_MS,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export async function checkDatabaseConnection(): Promise<void> {
  const result = await pool.query<{
    current_database: string;
    current_user: string;
  }>("SELECT current_database(), current_user");

  console.log("PostgreSQL connected successfully:");
  console.log(`Database: ${result.rows[0]?.current_database}`);
  console.log(`User: ${result.rows[0]?.current_user}`);
}
