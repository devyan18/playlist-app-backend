import { header, param, body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const createPlaylistValidations = [
  body('title')
    .notEmpty().withMessage('El campo { title } no debe estar vacio.')
    .isString().withMessage('El campo { title } debe ser un string.'),
  applyValidations,
];

export const listPlaylistValidations = [
  header('authorization').exists(),
  applyValidations,
];

export const getPlaylistValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playlistId } no debe estar vacio.')
    .isString().withMessage('El parametro { playlistId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playlistId } debe ser una id valida.'),
  applyValidations,
];

export const updatePlaylistValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playlistId } no debe estar vacio.')
    .isString().withMessage('El parametro { playlistId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playlistId } debe ser una id valida.'),
  body('title')
    .optional()
    .notEmpty().withMessage('El campo { title } no debe estar vacio.')
    .isString().withMessage('El campo { title } debe ser un string.'),
  applyValidations,
];

export const deletePlaylistValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playlistId } no debe estar vacio.')
    .isString().withMessage('El parametro { playlistId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playlistId } debe ser una id valida.'),
  applyValidations,
];
