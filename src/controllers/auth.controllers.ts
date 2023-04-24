import { Request, Response } from 'express';
import { compare, generateJWT } from '../helpers';
import { User } from '../models';
import { googleVerify } from '../helpers/google-verify';

export const loginCtrl = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // Verificar si el email existe
  if (!user) {
    res.status(404).json({
      msg: 'Usuario / Password no son correctos - Email',
    });
    return;
  }

  // Si el usuario esta activo
  if (!user.state) {
    res.status(404).json({
      msg: 'Usuario / Password no son correctos - State: false',
    });
    return;
  }

  // Verificar la contraseña
  const validPassword = await compare(password, user.password);
  if (!validPassword) {
    res.status(404).json({ msg: 'Usuario / Password no son correctos - Password' });
    return;
  }

  // Generar el JWT
  const token = await generateJWT(user.id);

  try {
    res.json({
      user,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  const { id_token } = req.body;

  try {
    const { email, img, name } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    // Si el usuario no existe
    if (!user) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Si el usuario en DB
    if (!user.state) {
      res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
      return;
    }

    // Generar jwt
    const token = await generateJWT(user.id);

    res.json({
      msg: 'Todo bien',
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar',
    });
  }
};
