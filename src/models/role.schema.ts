import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
  },
});

export const Role = model('Role', RoleSchema);
