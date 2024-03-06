import Redis from 'ioredis';
import { CACHE_EXPIRATION_TIME, REDIS_HOST, REDIS_PORT, STATISTICS_KEY } from '../../utils/constants';
import { Image } from '../../models/image.model';
import { Statistics } from '../../models/statistics.model';

class CacheManager {
  private static instance: CacheManager;
  private redis: Redis;

  private constructor() {
    this.redis = new Redis({
      port: parseInt(REDIS_PORT),
      host: REDIS_HOST,
    });
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }

    return CacheManager.instance;
  }

  public async setImage(image: Image, imageBuffer: Buffer): Promise<void> {
    const key = `${image.name}-${image.resolution}`;

    await this.redis.set(key, imageBuffer.toString('base64'));
    await this.redis.expire(key, CACHE_EXPIRATION_TIME);
  }

  public async getImage(image: Image): Promise<Buffer | null> {
    const key = `${image.name}-${image.resolution}`;
    const value = await this.redis.get(key);

    return value ? Buffer.from(value, 'base64') : null;
  }

  public async setStatistics(statistics: Statistics): Promise<void> {
    await this.redis.set(STATISTICS_KEY, JSON.stringify(statistics));
  }

  public async getStatistics(): Promise<Statistics> {
    const value = await this.redis.get(STATISTICS_KEY);

    return value ? JSON.parse(value) : null;
  }
}

// Singleton pattern
export const cacheManager = CacheManager.getInstance();
Object.freeze(cacheManager);

