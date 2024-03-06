import { check } from 'express-validator';

export const rulesValidators = [
  check('name').notEmpty().withMessage('Name is required.'),
  check('resolution')
    .matches(/^[0-9]{1,4}x[0-9]{1,4}$/)
    .withMessage('Invalid resolution format.'),
];

export const escapeImageValidators = [
  check('name').isString().escape(),
  check('resolution').isString().escape(),
];

export const inputValidators = [ ...rulesValidators, ...escapeImageValidators]
