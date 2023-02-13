import { NextFunction } from 'express';
import { authenticated, authorization } from 'utils';

const adminPermission = async (token: string, next: NextFunction) => {
  const { isAdmin } = authenticated(token);
  authorization(isAdmin);
  return next();
};

export default adminPermission;
