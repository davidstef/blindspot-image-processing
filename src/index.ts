import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './api/routes';
import { initStatisticsCache } from './services/cache/init-cache';
import logger from './utils/logger';
import { PORT } from './utils/constants';

dotenv.config();
export const app: Express = express();

app.use('/', routes);

app.listen(PORT, () => {
  initStatisticsCache();

  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});