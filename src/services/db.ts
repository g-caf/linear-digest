import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS teammates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone_e164 TEXT NOT NULL,
      active BOOLEAN DEFAULT true,
      consent_timestamp TIMESTAMPTZ,
      consent_ip TEXT
    )
  `);
  
  // Add consent columns if they don't exist (for existing databases)
  await pool.query(`
    ALTER TABLE teammates 
    ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS consent_ip TEXT
  `);
}
