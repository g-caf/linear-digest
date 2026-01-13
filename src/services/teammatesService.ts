import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Teammate } from '../config/teammates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/teammates.json');

export function getTeammates(): Teammate[] {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

export function addTeammate(teammate: Teammate): void {
  const teammates = getTeammates();
  teammates.push(teammate);
  fs.writeFileSync(dataPath, JSON.stringify(teammates, null, 2));
}

export function removeTeammate(id: string): void {
  const teammates = getTeammates();
  const filtered = teammates.filter(t => t.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(filtered, null, 2));
}
