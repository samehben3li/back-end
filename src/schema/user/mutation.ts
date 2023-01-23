import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server-core';
import { User } from '../../model';
import {
  authenticated,
  authorization,
  deleteData,
  generatePassword,
} from '../../utils';

const userMutation: IResolvers = {
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
          { new: true, multi: false, runValidators: true },
        );
      } else {
        updatedUser = await User.findByIdAndUpdate(
          id,
          {
            username,
            email,
          },
          { new: true, multi: false, runValidators: true },
        );
      }
      return updatedUser;
    } catch ({ ...err, kind, code }) {
      if (kind === 'ObjectId') {
        return new Error('USER_NOT_FOUND');
      }
      if (code === 11000) {
        return new Error('INFORMATION_ALREADY_EXIST');
      }
      return err;
    }
  },

  deleteUser: (_parent, { id }, context) =>
    deleteData(
      context.req.headers.authorization?.split(' ').pop().trim(),
      id,
      User,
    ),
};

export default userMutation;
