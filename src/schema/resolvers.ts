import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import Flag from '../model/Flag';
import PlantPart from '../model/input-options/PlantPart';
import RiskCategory from '../model/input-options/RiskCategory';
import User from '../model/User';
import authenticated from '../utils/authenticated';
import getInputContent from '../utils/getInputContent';
import authorization from '../utils/authorization';
import generatePassword from '../utils/generatePassword';

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
    getUsers: async (_parent, _args, context) => {
      const { isAdmin } = authenticated(
        context.req.headers.authorization?.split(' ').pop().trim(),
      );
      authorization(isAdmin);
      return User.find().then(users => users);
    },
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
    createUser: async (_parent, { username, email, password }, context) => {
      const { isAdmin } = authenticated(
        context.req.headers.authorization?.split(' ').pop().trim(),
      );
      authorization(isAdmin);
      const hashPassword = await generatePassword(password);
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
    updateUser: async (_parent, { id, username, email, password }, context) => {
      const { isAdmin } = authenticated(
        context.req.headers.authorization?.split(' ').pop().trim(),
      );
      authorization(isAdmin);
      try {
        let updatedUser;
        if (password) {
          const hashPassword = await generatePassword(password);
          updatedUser = await User.findByIdAndUpdate(
            id,
            {
              username,
              email,
              password: hashPassword,
            },
            { new: true },
          );
        } else {
          updatedUser = await User.findByIdAndUpdate(
            id,
            {
              username,
              email,
            },
            { new: true },
          );
        }
        return updatedUser;
      } catch (err) {
        throw new AuthenticationError('SOMETHING_WENT_WRONG');
      }
    },
    deleteUser: async (_parent, { id }, context) => {
      const { isAdmin } = authenticated(
        context.req.headers.authorization?.split(' ').pop().trim(),
      );
      authorization(isAdmin);
      await User.findByIdAndDelete(id);
      return 'USER_DELETED';
    },
    createRiskCategory: async (
      _parent,
      { name, imgUrl, riskCategoryTypes },
      context,
    ) => {
      const { isAdmin } = authenticated(
        context.req.headers.authorization?.split(' ').pop().trim(),
      );
      authorization(isAdmin);
      const newRiskCategory = await RiskCategory.create({
        name,
        imgUrl,
        riskCategoryTypes,
      });
      return newRiskCategory;
    },
    deleteRiskCategory: async (_parent, { id }, context) => {
      const { isAdmin } = authenticated(
        context.req.headers.authorization?.split(' ').pop().trim(),
      );
      authorization(isAdmin);
      await RiskCategory.findByIdAndDelete(id);
      return 'RISK_CATEGORY_DELETED';
    },
    updateRiskCategory: async (_parent, { id, name, imgUrl }, context) => {
      const { isAdmin } = authenticated(
        context.req.headers.authorization?.split(' ').pop().trim(),
      );
      authorization(isAdmin);
      const updatedRiskCategory = await RiskCategory.findByIdAndUpdate(
        id,
        {
          name,
          imgUrl,
        },
        { new: true },
      );
      return updatedRiskCategory;
    },
  },
} as IResolvers;
