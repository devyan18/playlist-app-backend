import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const createMusicValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playListId } no debe estar vacio.')
    .isString().withMessage('El parametro { playListId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playListId } debe ser una id valida.'),
  body('name')
    .notEmpty().withMessage('El campo { name } no debe estar vacio.')
    .isString().withMessage('El campo { name } debe ser un string.'),
  body('artist')
    .notEmpty().withMessage('El campo { artist } no debe estar vacio.')
    .isString().withMessage('El campo { artist } debe ser un string.'),
  body('year')
    .optional()
    .isNumeric().withMessage('El campo { year } debe ser un año válido.'),
  applyValidations,
];

export const listMusicValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playListId } no debe estar vacio.')
    .isString().withMessage('El parametro { playListId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playListId } debe ser una id valida.'),
  applyValidations,
];

export const deleteMusicValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playListId } no debe estar vacio.')
    .isString().withMessage('El parametro { playListId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playListId } debe ser una id valida.'),
  param('musicId')
    .notEmpty().withMessage('El parametro { musicId } no debe estar vacio.')
    .isString().withMessage('El parametro { musicId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { musicId } debe ser una id valida.'),
  applyValidations,
];

export const getMusicValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playListId } no debe estar vacio.')
    .isString().withMessage('El parametro { playListId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playListId } debe ser una id valida.'),
  param('musicId')
    .notEmpty().withMessage('El parametro { musicId } no debe estar vacio.')
    .isString().withMessage('El parametro { musicId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { musicId } debe ser una id valida.'),
  applyValidations,
];

export const updateMusicValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playListId } no debe estar vacio.')
    .isString().withMessage('El parametro { playListId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playListId } debe ser una id valida.'),
  param('musicId')
    .notEmpty().withMessage('El parametro { musicId } no debe estar vacio.')
    .isString().withMessage('El parametro { musicId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { musicId } debe ser una id valida.'),
  body('name')
    .optional()
    .notEmpty().withMessage('El campo { name } no debe estar vacio.')
    .isString().withMessage('El campo { name } debe ser un string.'),
  body('artist')
    .optional()
    .notEmpty().withMessage('El campo { artist } no debe estar vacio.')
    .isString().withMessage('El campo { artist } debe ser un string.'),
  body('year')
    .optional()
    .isNumeric().withMessage('El campo { year } debe ser un año válido.')
    .notEmpty().withMessage('El campo { year } no debe estar vacio.'),
  applyValidations,
];
