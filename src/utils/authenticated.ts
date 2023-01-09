import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default (token: string) => {
  if (!token) {
    throw new AuthenticationError('NOT_LOGGED_IN');
  }
  const { userId, isAdmin } = verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      maxAge: '1d',
    },
  ) as JwtPayload;
  if (!userId) {
    throw new AuthenticationError('INVALID_TOKEN');
  }
  return { userId, isAdmin };
};
