import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const IMG_DIR = process.env.IMG_DIR || 'images';
export const ROOT_FOLDER = process.cwd();
export const IMG_PATH = path.join(ROOT_FOLDER, IMG_DIR);

export const PORT = process.env.PORT || 4123;
export const REDIS_PORT = process.env.REDIS_PORT || '6379';
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

export const STATISTICS_KEY = 'statistics';
export const CACHE_EXPIRATION_TIME = parseInt(process.env.CACHE_EXPIRATION_TIME || '2 * 3600 * 1000');

// Any other extensions can be added to be accepted as an input
export const ACCEPTED_IMG_EXTENSIONS = process.env.ACCEPTED_IMG_EXTENSIONS || ['jpg', 'jpeg', 'png'];
