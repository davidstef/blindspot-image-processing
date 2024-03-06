import xss from 'xss';
import * as fs from 'fs';
import * as path from 'path';
import { ACCEPTED_IMG_EXTENSIONS } from './constants';
import logger from './logger';

export function sanitizeResolution(input: string): string {
    const sanitizedHTML = sanitizeHTML(input);
  
    const sanitizedInput = sanitizedHTML.replace(/[^0-9x]/g, '');
  
    const sanitizedWithValidX = sanitizedInput.replace(/(\d)x(\d)/g, '$1x$2');
  
    return sanitizedWithValidX;
}

export function sanitizeName(input: string): string {
    const sanitizedHTML = sanitizeHTML(input);

    const sanitizedInput = sanitizedHTML.replace(/[\s\\/]/g, '');

    return sanitizedInput;
}

export function sanitizeHTML(input: string): string {
  return xss(input);
}

export function countTotalImages(folderPath: string): number {
  try {
    const files = fs.readdirSync(folderPath);
    const count = files.reduce((acc, file) => {
      const fileExtension = path.extname(file)?.toLowerCase()?.slice(1);;
      if (ACCEPTED_IMG_EXTENSIONS.includes(fileExtension)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return count;
  } catch (error) {
    logger.error(`Error counting files: ${error}`);
    return 0;
  }
}