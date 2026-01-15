import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { initDb } from './services/db.js';
import healthRouter from './routes/health.js';
import jobsRouter from './routes/jobs.js';
import adminRouter from './routes/admin.js';
import signupRouter from './routes/signup.js';
import { logger } from './services/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/health', healthRouter);
app.use('/jobs', jobsRouter);
app.use('/admin', adminRouter);
app.use('/api/signup', signupRouter);

const port = env.PORT || 3000;

async function start() {
  await initDb();
  logger.info('Database initialized');
  
  app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
