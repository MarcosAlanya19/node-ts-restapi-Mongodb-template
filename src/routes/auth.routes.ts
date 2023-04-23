import { Router } from 'express';
import { check } from 'express-validator';
import { loginCtrl } from '../controllers';
import { validateFields } from '../middlewares';

export const authRouter = Router();

authRouter.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
  ],
  loginCtrl
);
