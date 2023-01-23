import { IResolvers } from '@graphql-tools/utils';
import { User } from '../../model';
import { getAllData } from '../../utils';

const userQuery: IResolvers = {
  getUsers: (_parent, { page = 1, limit = 10 }, context) =>
    getAllData(context.req.headers.authorization?.split(' ').pop().trim(), () =>
      User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .then(users => users),
    ),
};

export default userQuery;
