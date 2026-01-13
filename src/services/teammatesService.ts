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

export async function addTeammate(teammate: Teammate): Promise<void> {
  await pool.query(
    'INSERT INTO teammates (id, name, email, phone_e164, active) VALUES ($1, $2, $3, $4, $5)',
    [teammate.id, teammate.name, teammate.email, teammate.phoneE164, teammate.active ?? true]
  );
}

export async function removeTeammate(id: string): Promise<void> {
  await pool.query('DELETE FROM teammates WHERE id = $1', [id]);
}
