import { check, validationResult } from 'express-validator';

export const validateParam = () => {
  return [check('email').isEmail(), check('password').isLength({ min: 6 })];
};
