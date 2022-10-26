import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import Flag from '../model/Flag';
import PlantPart from '../model/input-options/PlantPart';
import RiskCategory from '../model/input-options/RiskCategory';
import User from '../model/User';

export default {
  Query: {
    getFlags: (_parent, _args, context) => {
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
      return Flag.find({ userId })
        .sort({ createdAt: -1 })
        .then(flags => flags);
    },
    getRiskCategories: (_parent, _args, context) => {
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
      return RiskCategory.find().then(rcs => rcs);
    },
    getPlantPart: (_parent, _args, context) => {
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
      return PlantPart.find().then(pps => pps);
    },
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
      const { riskCategory, riskCategoryType, plantPart, location } = args;
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
        riskCategoryType,
        plantPart,
        location,
      });
      return flag;
    },
  },
} as IResolvers;
