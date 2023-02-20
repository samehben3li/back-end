import { NextFunction } from 'express';
import { IContext } from '../interfaces';
import authenticated from './authenticated';
import authorization from './authorization';

const adminPermission = async (context: IContext, next: NextFunction) => {
  const token = context.req.headers.authorization?.split(' ')[1];
  const { isAdmin } = authenticated(token);
  authorization(isAdmin);
  return next();
};

export default adminPermission;
