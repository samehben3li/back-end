import { generatePassword } from '../utils';
import User from '../model/User';

export const getUsers = (page: number, limit: number) =>
  User.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .then(users => users);

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const hashPassword = await generatePassword(password);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return newUser;
  } catch (err) {
    throw new Error('INFORMATION_ALREADY_EXIST');
  }
};

export const updateUser = async (
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
  } catch ({ kind, code, ...err }) {
    if (kind === 'ObjectId') {
      return new Error('USER_NOT_FOUND');
    }
    if (code === 11000) {
      return new Error('INFORMATION_ALREADY_EXIST');
    }
    return err;
  }
};
