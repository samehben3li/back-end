import { NextFunction } from 'express';
import authenticated from './authenticated';
import authorization from './authorization';

const getAllData = async (token: string, next: NextFunction) => {
  const { isAdmin } = authenticated(token);
  authorization(isAdmin);
  return next();
};

export default getAllData;
