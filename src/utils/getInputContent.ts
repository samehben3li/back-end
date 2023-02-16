import { NextFunction } from 'express';
import authenticated from './authenticated';

const getInputContent = (token: string, next: NextFunction) => {
  authenticated(token);
  return next();
};

export default getInputContent;
