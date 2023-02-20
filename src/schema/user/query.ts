import { IResolvers } from '@graphql-tools/utils';
import { getUsers } from '../../controllers';
import { adminPermission } from '../../utils';

const userQuery: IResolvers = {
  getUsers: (_parent, { page = 1, limit = 10 }, context) =>
    adminPermission(context, () => getUsers(page, limit)),
};

export default userQuery;
