import { ImageResolution } from '../models/image-resolution.model';
import { ACCEPTED_IMG_EXTENSIONS } from './constants';
import logger from './logger';

export function parseResolution(resolution: string): ImageResolution | null {
  const [widthStr, heightStr] = resolution.split('x');
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  if (isNaN(width) || isNaN(height)) {
    logger.error('Invalid resolution.');
    return null;
  }

  return { width, height };
}

export function parseFileExtension(fileName: string): string | null {
  const lastDotIndex = fileName.lastIndexOf('.');

  if (lastDotIndex === -1) {
    logger.error('The extension does not exists.');
    return null;
  }

  const extension = fileName.slice(lastDotIndex + 1);

  if (!ACCEPTED_IMG_EXTENSIONS.includes(extension)) {
    logger.error(
      `Wrong extension, please choose a correct one from this list: ${ACCEPTED_IMG_EXTENSIONS}.`
    );
    return null;
  }

  return extension.toLowerCase();
}
