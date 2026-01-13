import { Router } from 'express';
import { env } from '../config/env.js';
import { runDailyDigestJob } from '../jobs/dailyDigestJob.js';
import { logger } from '../services/logger.js';

const router = Router();

router.post('/daily-digest', async (req, res) => {
  const token = (req.query.token as string) || req.headers['x-cron-token'];

  logger.info('Daily digest job triggered');

  if (token !== env.CRON_SECRET) {
    logger.warn('Daily digest job rejected: invalid token');
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    await runDailyDigestJob();
    logger.info('Daily digest job completed successfully');
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    logger.error({ message: 'Daily digest job failed', error: String(error) });
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
