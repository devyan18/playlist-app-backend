import { body } from 'express-validator';
import { applyValidations } from '../../middlewares/apply-validations.js';
import { UserModel } from '../User.js';

export const createUserValidations = [
  body('avatar')
    .notEmpty().withMessage('El campo { avatar } no debe estar vacio.')
    .isString().withMessage('El campo { avatar } debe ser un string.')
    .isURL().withMessage('El campo { avatar } debe ser una URL válida.'),
  body('email')
    .notEmpty().withMessage('El campo { email } no debe estar vacio.')
    .isEmail().withMessage('El campo { email } debe ser un email válido.')
    // validación personalizada para verificar que el email no esté en uso.
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });

      if (user) throw new Error('Email already in use');

      return true;
    }),
  body('username')
    .notEmpty().withMessage('El campo { username } no debe estar vacio.')
    .isString().withMessage('El campo { username } debe ser un string.')
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });

      if (user) throw new Error('username already in use');

      return true;
    }),
  body('password')
    .notEmpty().withMessage('El campo { password } no debe estar vacio.')
    .isString().withMessage('El campo { password } debe ser un string.'),
  applyValidations,
];

export const loginUserValidations = [
  body('email')
    .notEmpty().withMessage('El campo { email } no debe estar vacio.')
    .isEmail().withMessage('El campo { email } debe ser un email válido.'),
  body('password')
    .notEmpty().withMessage('El campo { password } no debe estar vacio.')
    .isString().withMessage('El campo { password } debe ser un string.'),
  applyValidations,
];
