import { IResolvers } from '@graphql-tools/utils';
import { Flag } from '../../model';
import { authenticated, authorization } from '../../utils';

const flagQuery: IResolvers = {
  getFlags: (_parent, _args, context) => {
    const token =
      context.req.headers.authorization?.split(' ').pop().trim() || '';
    const { userId } = authenticated(token);
    return Flag.find({ userId })
      .sort({ createdAt: -1 })
      .then(flags => flags);
  },

  getAllFlags: async (_parent, { page = 1, limit = 10 }, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    return Flag.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .then(flags => flags);
  },
};

export default flagQuery;
