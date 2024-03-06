import * as fs from 'fs';
import sharp from 'sharp';
import { Image } from '../models/image.model';

import { IMG_PATH } from '../utils/constants';
import logger from '../utils/logger';
import { parseResolution } from '../utils/parser';
import { cacheManager } from './cache/cache-manager';

sharp.cache({ memory: 500, items: 50 });

export async function readResizedImage(
  image: Image
): Promise<Buffer | null> {
  const imagePath = `${IMG_PATH}/${image.name}`;

  try {
    if (!fs.existsSync(imagePath)) {
      logger.error(`The image: ${image.name} doesn't exists in target folder.`);
      return null;
    }

    const parsedResolution = parseResolution(image.resolution);

    if (!parsedResolution) {
      logger.error('The resolution could not be parsed!');
      return null;
    }

    const imageBuffer = await sharp(imagePath)
      .resize({ width: parsedResolution.width, height: parsedResolution.height })
      .toBuffer();

    await cacheManager.setImage(image, imageBuffer);

    return imageBuffer;
  } catch (error: any) {
    logger.error(`Error trying to read the image: ${image.name}, ${error.message}`);
    return null;
  }
}

export async function getImgMetadataFromBuffer(imageBuffer: Buffer) {
  return await sharp(imageBuffer).metadata();
}
