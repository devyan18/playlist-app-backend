import { validationResult } from 'express-validator';

function cleanErrors (errors) {
  const errorsGroup = {};

  errors.forEach((objeto) => {
    const path = objeto.path;
    const location = objeto.location;

    if (!errorsGroup[location]) {
      errorsGroup[location] = {};
    }

    if (!errorsGroup[location][path]) {
      errorsGroup[location][path] = [];
    }

    errorsGroup[location][path].push(
      objeto.msg
    );
  });

  return errorsGroup;
}

export const applyValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: cleanErrors(errors.array()) });
  }
  next();
};
