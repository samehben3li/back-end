import { genSalt, hash } from 'bcrypt';
import { becryptSalt } from '../config';

const generatePassword = async (password: string) => {
  const salt = await genSalt(becryptSalt);
  const hashPassword = await hash(password, salt);
  return hashPassword;
};

export default generatePassword;
