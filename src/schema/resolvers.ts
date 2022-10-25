import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import Flag from '../model/Flag';
import User from '../model/User';

const resolvers: IResolvers = {
  // just for test
  Query: {
    all: async () => User.find().then(users => users),
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
    addFlag: async (_parent, args, context) => {
      const { riskCategory, pestType, plantPart, location } = args;
      const token = context.req.headers.authorization?.split(' ').pop().trim();
      if (!token) {
        throw new AuthenticationError('Not logged in');
      }
      const { userId } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        { maxAge: '1d' },
      ) as jwt.JwtPayload;
      if (!userId) {
        throw new AuthenticationError('Invalid token');
      }
      const flag = await Flag.create({
        userId,
        riskCategory,
        pestType,
        plantPart,
        location,
      });
      return flag;
    },
  },
};

export default resolvers;
