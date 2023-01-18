import { IResolvers } from '@graphql-tools/utils';
import { User } from '../../model';
import { authenticated, authorization } from '../../utils';

const userQuery: IResolvers = {
  getUsers: async (_parent, { page = 1, limit = 1 }, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    return User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .then(users => users);
  },
};

export default userQuery;
