import { Router } from 'express';
import { addTeammate, getTeammateByEmail } from '../services/teammatesService.js';
import { logger } from '../services/logger.js';

const router = Router();

function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('1') && digits.length === 11) {
    return '+' + digits;
  }
  if (digits.length === 10) {
    return '+1' + digits;
  }
  return '+' + digits;
}

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, consent } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    if (!consent) {
      return res.status(400).json({ error: 'You must consent to receive SMS notifications' });
    }

    const existing = await getTeammateByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'This email is already registered' });
    }

    const phoneE164 = normalizePhoneNumber(phone);
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;

    await addTeammate({
      id: crypto.randomUUID(),
      name,
      email,
      phoneE164,
      active: true,
    }, ip);

    logger.info({ message: 'New teammate signed up', email, ip });

    res.json({ success: true });
  } catch (error) {
    logger.error({ message: 'Signup error', error: String(error) });
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
