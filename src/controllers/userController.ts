import { generatePassword } from '../utils';
import User from '../model/User';
import { IUser } from '../interfaces';

export const getUsers = (page: number, limit: number) =>
  User.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .then(users => {
      if (!users || users.length === 0) {
        throw new Error('USERS_NOT_FOUND');
      }
      return users;
    })
    .catch(err => err);

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

export const updateUser = async ({ id, password, ...userInfo }: IUser) => {
  try {
    const hashPassword = password
      ? await generatePassword(password)
      : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
        ...userInfo,
      },
      { new: true, multi: false, runValidators: true },
    );
    if (!updatedUser) {
      throw new Error('USER_NOT_FOUND');
    }
    return updatedUser;
  } catch ({ codeName, message }) {
    return new Error(
      codeName === 'DuplicateKey'
        ? 'INFORMATION_ALREADY_EXIST'
        : 'USER_NOT_FOUND',
    );
  }
};
