import { Model } from 'mongoose';
import authenticated from './authenticated';
import authorization from './authorization';
import { IUser, IRiskCategory } from '../interfaces';

const deleteData = async (
  token: string,
  id: string,
  model: Model<IUser> | Model<IRiskCategory>,
) => {
  const { isAdmin } = authenticated(token);
  authorization(isAdmin);
  await model.findByIdAndDelete(id);
  return 'DATA_DELETED';
};

export default deleteData;
