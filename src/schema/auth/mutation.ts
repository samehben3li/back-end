import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server-core';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { accessTokenSecret } from '../../config';
import { User } from '../../model';

const authMutation: IResolvers = {
  login: async (_parent, { email, password }) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    const validatedPassword = await compare(password, user?.password as string);
    if (!user || !validatedPassword) {
      throw new AuthenticationError('INCORRECT_CREDENTIALS');
    }
    const accessToken = sign(
      { userId: user?.id, isAdmin: user.isAdmin },
      accessTokenSecret,
      { expiresIn: '1d' },
    );

    return { accessToken, user };
  },
};

export default authMutation;
