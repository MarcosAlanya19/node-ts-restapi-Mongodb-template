import { User } from '../models/user.schema';
import { IUser } from '../interface/user.interface';

export const getAllUsers = async () => {
  return await User.find();
};

export const createNewUser = async (data: IUser) => {
  const newUser = new User(data);
  await newUser.save();

  return newUser;
};

export const updateUserById = async (id: string, data: IUser) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUserById = async (id: string): Promise<IUser> => {
  return (await User.findByIdAndDelete(id)) as IUser;
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};
