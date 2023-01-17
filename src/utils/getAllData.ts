import { NextFunction } from 'express';
import { authenticated, authorization } from '.';

const getAllData = async (token: string, next: NextFunction) => {
  const { isAdmin } = authenticated(token);
  authorization(isAdmin);
  return next();
};

export default getAllData;
