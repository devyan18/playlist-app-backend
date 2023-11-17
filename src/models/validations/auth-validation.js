import { header } from 'express-validator';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const authHeader = [
  header('authorization')
    .exists().withMessage('Debe enviar el header { Authorization } con el token.'),
  applyValidations
];
