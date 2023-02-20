import { NextFunction } from 'express';
import { IContext } from '../interfaces';
import authenticated from './authenticated';

const getInputContent = (context: IContext, next: NextFunction) => {
  const token = context.req.headers.authorization?.split(' ')[1];
  authenticated(token);
  return next();
};

export default getInputContent;
