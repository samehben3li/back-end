import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const userModel = model<IUser>('User', userSchema);

export default userModel;
