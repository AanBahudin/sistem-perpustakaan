// utils/withValidationErrors.ts
import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotAuthorized } from '../errors/errorHandler';

const withValidationErrors = (validators: ValidationChain[]) => {
  return [
    ...validators,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(err => err.msg).join(', ');

        if (errorMessage.toLowerCase().startsWith('not authorized')) {
          throw new NotAuthorized('Not authorized to access this route');
        }

        throw new BadRequestError(errorMessage);
      }

      next();
    }
  ];
};

export default withValidationErrors;
