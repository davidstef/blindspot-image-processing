import { Request, Response, NextFunction } from 'express';
import { resizeImage } from '../services/image-resize';
import { parseFileExtension } from '../utils/parser';
import { Image } from '../models/image.model';
import { countTotalImages, sanitizeName, sanitizeResolution } from '../utils/utils';
import { validationResult } from 'express-validator';
import { IMG_PATH } from '../utils/constants';
import { Statistics } from '../models/statistics.model';
import logger from '../utils/logger';
import { cacheManager } from '../services/cache/cache-manager';

export async function getImage(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const name = sanitizeName(req.params.name);
    const resolution = sanitizeResolution(req.query.resolution?.toString() || '');
    const extension = parseFileExtension(name);
    if (!extension) {
      return res.status(422).send('The extension is wrong or does not exists!');
    }

    const statistics: Statistics = await cacheManager.getStatistics();
    const image = { name, resolution } as Image;
    const cachedImage = await cacheManager.getImage(image);

    if (cachedImage) {
      statistics.cacheHits++;
      await cacheManager.setStatistics(statistics);
      logger.info(`Image ${image.name} provided from cache for: ${resolution}`);

      return res.type(`image/jpeg`).send(cachedImage);
    } else {
      statistics.cacheMisses++;
      await cacheManager.setStatistics(statistics);
    }

    const resizedImage = await resizeImage(image);
    if (!resizedImage) {
      return res.status(404).send('The image could not be resized or does not exist.');
    }

    statistics.resizedImageCount++;
    await cacheManager.setStatistics(statistics);

    res.contentType(`image/jpeg`);
    res.send(resizedImage);
  } catch (error) {
    next(error);
  }
}

export async function getStatistics(_req: Request, res: Response, next: NextFunction) {
  try {
    const totalOriginalImages = countTotalImages(IMG_PATH);
    const statistics: Statistics = await cacheManager.getStatistics();    
    statistics.totalOriginalImages = totalOriginalImages;

    res.json(statistics);
  } catch (error) {
    next(error);
  }
}
