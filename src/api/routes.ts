import express from 'express';
import { getImage, getStatistics } from './image.controller';
import { inputValidators } from '../utils/validators';

const router = express.Router();

router.get('/image/:name', inputValidators, getImage);

router.get('/statistics', getStatistics);

export default router;
