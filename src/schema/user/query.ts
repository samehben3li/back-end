import { IResolvers } from '@graphql-tools/utils';
import User from '../../model/User';
import { getAllData } from '../../utils';

const userQuery: IResolvers = {
  getUsers: (_parent, _args, context) =>
    getAllData(context.req.headers.authorization?.split(' ').pop().trim(), () =>
      User.find().then(users => users),
    ),
};

export default userQuery;
