import { generatePassword } from '.';
import User from '../model/User';

const createUser = async (
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

export default createUser;
