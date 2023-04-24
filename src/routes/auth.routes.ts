import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, loginCtrl } from '../controllers';
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

authRouter.post(
  '/google',
  [check('id_token', 'id_token es necesario').not().isEmpty(), validateFields],
  googleSignIn
);
