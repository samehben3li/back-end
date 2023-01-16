import { IResolvers } from '@graphql-tools/utils';
import { User } from '../../model';
import { authenticated, authorization } from '../../utils';

const userQuery: IResolvers = {
  getUsers: async (_parent, _args, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    return User.find().then(users => users);
  },
};

export default userQuery;
