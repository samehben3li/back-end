import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { accessTokenSecret } from '../config';

export default (token: string) => {
  if (!token) {
    throw new AuthenticationError('NOT_LOGGED_IN');
  }
  const { userId, isAdmin } = verify(token, accessTokenSecret, {
    maxAge: '1d',
  }) as JwtPayload;
  if (!userId) {
    throw new AuthenticationError('INVALID_TOKEN');
  }
  return { userId, isAdmin };
};
