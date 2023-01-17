import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server-core';
import { User } from '../../model';
import { authenticated, authorization, generatePassword } from '../../utils';

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
    } catch (err) {
      return new Error('USER_NOT_FOUND');
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
};

export default userMutation;
