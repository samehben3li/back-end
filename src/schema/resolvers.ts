import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import User from '../model/User';

const resolvers: IResolvers = {
  // just for test
  Query: {
    all: () => User.find().then(users => users),
  },
  Mutation: {
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || password !== user.password) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1d' },
      );
      return { accessToken, user };
    },
  },
};

export default resolvers;
