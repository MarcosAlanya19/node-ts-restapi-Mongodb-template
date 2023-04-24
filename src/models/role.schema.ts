import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
  },
});

export const Role = model('Role', RoleSchema);

const createDefaultRoles = async () => {
  try {
    const roles = await Role.find();

    if (roles.length === 0) {
      await Role.create([
        { role: 'ADMIN_ROLE' },
        { role: 'USER_ROLE' },
        { role: 'VENTAS_ROLE' },
      ]);

      console.log('Roles creados exitosamente');
    } else {
      console.log('Ya existen roles en la base de datos');
    }
  } catch (error) {
    console.error(error);
  }
};

createDefaultRoles();
