import { Statistics } from '../../models/statistics.model';
import { cacheManager } from './cache-manager';

export async function initStatisticsCache() {
  const cachedStatistics: Statistics = await cacheManager.getStatistics();

  let statistics: Statistics = (!cachedStatistics) ? {
    totalOriginalImages: 0,
    resizedImageCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
  } : cachedStatistics;

  await cacheManager.setStatistics(statistics);
}