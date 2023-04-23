import { Schema, model } from 'mongoose';
import { Role } from '../interface';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatorio'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: [Role.ADMIN, Role.USER, Role.VENTAS],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uuid = _id;
  return user;
};

export const User = model('User', UserSchema);
