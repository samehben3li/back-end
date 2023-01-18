import { generatePassword } from '.';
import User from '../model/User';

const updateUser = async (
  id: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    let updatedUser;
    if (password) {
      const hashPassword = await generatePassword(password);
      updatedUser = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          password: hashPassword,
        },
        { new: true, multi: false, runValidators: true },
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
        },
        { new: true, multi: false, runValidators: true },
      );
    }
    return updatedUser;
  } catch ({ ...err, kind, code }) {
    if (kind === 'ObjectId') {
      return new Error('USER_NOT_FOUND');
    }
    if (code === 11000) {
      return new Error('INFORMATION_ALREADY_EXIST');
    }
    return err;
  }
};

export default updateUser;
