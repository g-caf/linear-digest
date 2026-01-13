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

router.get('/api/teammates', async (_req, res) => {
  try {
    const teammates = await getTeammates();
    res.json(teammates);
  } catch (err) {
    console.error('Error fetching teammates:', err);
    res.status(500).json({ error: 'Failed to fetch teammates' });
  }
});

router.post('/api/teammates', async (req, res) => {
  try {
    const teammate: Teammate = {
      id: crypto.randomUUID(),
      name: req.body.name,
      email: req.body.email,
      phoneE164: req.body.phoneE164,
      active: true,
    };
    await addTeammate(teammate);
    res.json(teammate);
  } catch (err) {
    console.error('Error adding teammate:', err);
    res.status(500).json({ error: 'Failed to add teammate' });
  }
});

router.delete('/api/teammates/:id', async (req, res) => {
  try {
    await removeTeammate(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error removing teammate:', err);
    res.status(500).json({ error: 'Failed to remove teammate' });
  }
});

export default router;
