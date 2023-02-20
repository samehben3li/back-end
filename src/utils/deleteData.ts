import { Model } from 'mongoose';
import { IUser, IRiskCategory } from '../interfaces';

const deleteData = async (
  model: Model<IUser> | Model<IRiskCategory>,
  id: string,
) => {
  try {
    await model.findByIdAndDelete(id);
    return 'DATA_DELETED';
  } catch (err) {
    return new Error('DATA_NOT_FOUND');
  }
};

export default deleteData;
