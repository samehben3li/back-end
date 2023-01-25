import { IResolvers } from '@graphql-tools/utils';
import { createUser, updateUser } from '../../controllers';
import { IUser } from '../../interfaces';
import User from '../../model/User';
import { adminPermission, deleteData } from '../../utils';

const userMutation: IResolvers = {
  createUser: async (_parent, { username, email, password }, context) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => createUser(username, email, password),
    ),
  updateUser: async (_parent, args: IUser, context) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => updateUser(args),
    ),
  deleteUser: (_parent, { id }, context) =>
    deleteData(
      context.req.headers.authorization?.split(' ').pop().trim(),
      id,
      User,
    ),
};

export default userMutation;
