import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTeammates, addTeammate, removeTeammate } from '../services/teammatesService.js';
import { Teammate } from '../config/teammates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/admin.html'));
});

router.get('/api/teammates', (_req, res) => {
  const teammates = getTeammates();
  res.json(teammates);
});

router.post('/api/teammates', (req, res) => {
  const teammate: Teammate = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email,
    phoneE164: req.body.phoneE164,
    active: true,
  };
  addTeammate(teammate);
  res.json(teammate);
});

router.delete('/api/teammates/:id', (req, res) => {
  removeTeammate(req.params.id);
  res.json({ success: true });
});

export default router;
