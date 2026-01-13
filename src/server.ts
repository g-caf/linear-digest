import express from 'express';
import { env } from './config/env.js';
import healthRouter from './routes/health.js';
import jobsRouter from './routes/jobs.js';
import { logger } from './services/logger.js';

const app = express();

app.use(express.json());

app.use('/health', healthRouter);
app.use('/jobs', jobsRouter);

const port = env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
