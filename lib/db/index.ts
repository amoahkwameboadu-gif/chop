import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const globalForDatabase = globalThis as typeof globalThis & {
  chopDatabasePool?: Pool;
};

const pool =
  globalForDatabase.chopDatabasePool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.chopDatabasePool = pool;
}

attachDatabasePool(pool);

export const db = drizzle(pool, { schema });
export { pool };
