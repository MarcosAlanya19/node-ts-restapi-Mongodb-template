import { Router } from 'express';
import { check } from 'express-validator';
import * as userCtrl from '../controllers';
import * as validator from '../helpers';
import { validateFields } from '../middlewares';

export const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', userCtrl.usersCtrlGet);

// Ruta para actualizar un usuario
router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId().custom(validator.existUserById), // Verifica que el ID del usuario sea válido y existe en la base de datos
    check('role').custom(validator.isRoleValidate), // Verifica que el rol del usuario sea válido
    validateFields, // Middleware para validar los campos enviados
  ],
  userCtrl.userCtrlPut
);

// Ruta para crear un nuevo usuario
router.post(
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
router.delete(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId().custom(validator.existUserById), // Verifica que el ID del usuario sea válido y existe en la base de datos
    validateFields, // Middleware para validar los campos enviados
  ],
  userCtrl.userCtrlDelete
);
