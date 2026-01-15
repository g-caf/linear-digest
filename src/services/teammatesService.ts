import { pool } from './db.js';
import { Teammate } from '../config/teammates.js';

export async function getTeammates(): Promise<Teammate[]> {
  const result = await pool.query('SELECT * FROM teammates ORDER BY name');
  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phoneE164: row.phone_e164,
    active: row.active,
  }));
}

export async function addTeammate(teammate: Teammate, consentIp?: string): Promise<void> {
  await pool.query(
    'INSERT INTO teammates (id, name, email, phone_e164, active, consent_timestamp, consent_ip) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [teammate.id, teammate.name, teammate.email, teammate.phoneE164, teammate.active ?? true, new Date(), consentIp ?? null]
  );
}

export async function getTeammateByEmail(email: string): Promise<Teammate | null> {
  const result = await pool.query('SELECT * FROM teammates WHERE email = $1', [email]);
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phoneE164: row.phone_e164,
    active: row.active,
  };
}

export async function removeTeammate(id: string): Promise<void> {
  await pool.query('DELETE FROM teammates WHERE id = $1', [id]);
}
