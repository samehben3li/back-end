import { IResolvers } from '@graphql-tools/utils';
import { Flag } from '../../model';
import { authenticated, getAllData } from '../../utils';

const flagQuery: IResolvers = {
  getFlags: (_parent, _args, context) => {
    const token =
      context.req.headers.authorization?.split(' ').pop().trim() || '';
    const { userId } = authenticated(token);
    return Flag.find({ userId })
      .sort({ createdAt: -1 })
      .then(flags => flags);
  },
  getAllFlags: (_parent, { page = 1, limit = 10 }, context) =>
    getAllData(context.req.headers.authorization?.split(' ').pop().trim(), () =>
      Flag.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .then(flags => flags),
    ),
};

export default flagQuery;
