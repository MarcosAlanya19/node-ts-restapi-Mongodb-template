import { User } from '../models';

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }); // pasar el argumento email
  return user;
};
