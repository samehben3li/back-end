import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import { sign } from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt';
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
      const { userId } = authenticated(token);
      return Flag.find({ userId })
        .sort({ createdAt: -1 })
        .then(flags => flags);
    },
    getRiskCategories: (_parent, _args, context) =>
      getInputContent(
        context.req.headers.authorization?.split(' ').pop().trim(),
        () => RiskCategory.find().then(rcs => rcs),
      ),
    getPlantPart: (_parent, _args, context) =>
      getInputContent(
        context.req.headers.authorization?.split(' ').pop().trim(),
        () => PlantPart.find().then(pps => pps),
      ),
  },
  Mutation: {
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      const validatedPassword = await compare(
        password,
        user?.password as string,
      );
      if (!user || !validatedPassword) {
        throw new AuthenticationError('INCORRECT_CREDENTIALS');
      }
      const accessToken = sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1d' },
      );

      return { accessToken, user };
    },
    addFlag: async (_parent, args, context) => {
      const { riskCategory, riskCategoryType, plantPart, location } = args;
      const token = context.req.headers.authorization?.split(' ').pop().trim();
      const { userId } = authenticated(token);
      const flag = await Flag.create({
        userId,
        riskCategory,
        riskCategoryType,
        plantPart,
        location,
      });
      return flag;
    },
    createUser: async (_parent, args, context) => {
      const { username, email, password } = args;
      const token = context.req.headers.authorization?.split(' ').pop().trim();
      const { isAdmin } = authenticated(token);
      if (!isAdmin) {
        throw new AuthenticationError('NOT_AUTHORIZED');
      }
      const salt = await genSalt(Number(process.env.BCRYPT_SALT));
      const hashPassword = await hash(password, salt);
      try {
        const newUser = await User.create({
          username,
          email,
          password: hashPassword,
        });
        return newUser;
      } catch (err) {
        throw new AuthenticationError('SOMETHING_WENT_WRONG');
      }
    },
  },
} as IResolvers;
