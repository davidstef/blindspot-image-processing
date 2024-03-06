import { Image } from '../models/image.model';
import logger from '../utils/logger';
import { readResizedImage } from './image-reader';

export async function resizeImage(image: Image) {
  if (!image.resolution) {
    logger.error('The resolution was not properly specified!');
    return null;
  }

  const resizedImage = await readResizedImage(image);

  return resizedImage;
}
