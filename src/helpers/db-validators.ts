import { Types } from 'mongoose';
import { Role, User } from '../models';

export const isRoleValidate = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no está registrado en la base de datos`);
  }
};

export const existEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El email ${email} ya existe`);
  }
};

export const existUserById = async (_id: string) => {
  if (!Types.ObjectId.isValid(_id)) {
    throw new Error(`El _id ${_id} no es válido`);
  }

  const existUser = await User.findById(_id);
  if (!existUser) {
    throw new Error(`El _id ${_id} no existe`);
  }
};
