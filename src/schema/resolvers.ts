import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import Flag from '../model/Flag';
import PlantPart from '../model/input-options/PlantPart';
import RiskCategory from '../model/input-options/RiskCategory';
import User from '../model/User';
import authenticated from '../utils/authenticated';
import getInputContent from '../utils/getInputContent';

export default {
  Query: {
    getFlags: (_parent, _args, context) => {
      const token =
        context.req.headers.authorization?.split(' ').pop().trim() || '';
      const userId = authenticated(token);
      return Flag.find({ userId })
        .sort({ createdAt: -1 })
        .then(flags => flags);
    },
    getRiskCategories: (_parent, _args, context) =>
      getInputContent(
        context.req.headers.authorization?.split(' ').pop().trim(),
        () => RiskCategory.find().then(rcs => rcs),
      ),

    /* {
      const token = context.req.headers.authorization?.split(' ').pop().trim();
      authenticated(token);
      return RiskCategory.find().then(rcs => rcs);
    } */
    getPlantPart: (_parent, _args, context) =>
      getInputContent(
        context.req.headers.authorization?.split(' ').pop().trim(),
        () => PlantPart.find().then(pps => pps),
      ),
    // {
    //   const token = context.req.headers.authorization?.split(' ').pop().trim();
    //   authenticated(token);
    //   return PlantPart.find().then(pps => pps);
    // },
  },
  Mutation: {
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user || password !== user.password) {
        throw new AuthenticationError('INCORRECT_CREDENTIALS');
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
      const userId = authenticated(token);
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
