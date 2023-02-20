import { Model } from 'mongoose';
import { IUser, IRiskCategory, IContext } from '../interfaces';
import authenticated from './authenticated';
import authorization from './authorization';

const deleteData = async (
  context: IContext,
  model: Model<IUser> | Model<IRiskCategory>,
  id: string,
) => {
  const token = context.req.headers.authorization?.split(' ')[1];
  const { isAdmin } = authenticated(token);
  authorization(isAdmin);
  try {
    await model.findByIdAndDelete(id);
    return 'DATA_DELETED';
  } catch (err) {
    return new Error('DATA_NOT_FOUND');
  }
};

export default deleteData;
