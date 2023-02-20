import { IResolvers } from '@graphql-tools/utils';
import { createUser, updateUser } from '../../controllers';
import { IUser } from '../../interfaces';
import { User } from '../../model';
import { adminPermission, deleteData } from '../../utils';

const userMutation: IResolvers = {
  createUser: async (_parent, { username, email, password }, context) =>
    adminPermission(context, () => createUser(username, email, password)),
  updateUser: async (_parent, args: IUser, context) =>
    adminPermission(context, () => updateUser(args)),
  deleteUser: (_parent, { id }, context) => deleteData(context, User, id),
};

export default userMutation;
