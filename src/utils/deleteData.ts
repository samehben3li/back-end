import { Model } from 'mongoose';
import { IUser, IRiskCategory } from '../interfaces';
import authenticated from './authenticated';
import authorization from './authorization';

const deleteData = async (
  token: string,
  id: string,
  model: Model<IUser> | Model<IRiskCategory>,
) => {
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
