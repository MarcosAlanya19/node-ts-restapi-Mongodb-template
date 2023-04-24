import { Router } from 'express';
import { check } from 'express-validator';
import { config } from '../config';
import * as userCtrl from '../controllers';
import * as validator from '../helpers';
import { haveRole, validateFields, validateJWT } from '../middlewares';
import { Role } from '../interface';

export const userRouter = Router();

// Ruta para obtener todos los usuarios
userRouter.get('/', userCtrl.usersCtrlGet);

// Ruta para actualizar un usuario
userRouter.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId().custom(validator.existUserById), // Verifica que el ID del usuario sea válido y existe en la base de datos
    check('role').custom(validator.isRoleValidate), // Verifica que el rol del usuario sea válido
    validateFields, // Middleware para validar los campos enviados
  ],
  userCtrl.userCtrlPut
);

// Ruta para crear un nuevo usuario
userRouter.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(), // Verifica que el nombre del usuario no esté vacío
    check('password', 'El password debe tener min 6 letras').isLength({ min: 6 }), // Verifica que el password del usuario tenga al menos 6 caracteres
    check('email', 'El correo no es válido').isEmail().custom(validator.existEmail), // Verifica que el correo del usuario sea válido y no esté registrado en la base de datos
    check('role').custom(validator.isRoleValidate), // Verifica que el rol del usuario sea válido
    validateFields, // Middleware para validar los campos enviados
  ],
  userCtrl.userCtrlPost
);

// Ruta para eliminar un usuario
userRouter.delete(
  '/:id',
  validateJWT,
  // isAdminRole,
  haveRole(Role.ADMIN, Role.VENTAS),
  [
    check('id', 'No es un ID válido').isMongoId().custom(validator.existUserById), // Verifica que el ID del usuario sea válido y existe en la base de datos
    validateFields, // Middleware para validar los campos enviados
  ],
  userCtrl.userCtrlDelete
);
