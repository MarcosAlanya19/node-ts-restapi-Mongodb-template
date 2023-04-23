import { Request, Response } from 'express';
import { compare, generateJWT } from '../helpers';
import { User } from '../models';

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
