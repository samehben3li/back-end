import { genSalt, hash } from 'bcrypt';

const generatePassword = async (password: string) => {
  const salt = await genSalt(Number(process.env.BCRYPT_SALT));
  const hashPassword = await hash(password, salt);
  return hashPassword;
};

export default generatePassword;
