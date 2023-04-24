import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { RequestWithUUID } from '../interface';
import { User } from '../models';

export const validateJWT = async (
  req: RequestWithUUID,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');

  // Verficacion de que token exista en los headers
  if (!token) {
    res.status(401).json({
      msg: 'No hay token en la petición',
    });
    return;
  }

  try {
    // llamada de uuid generado anteriormente, en caso el token sea el mismo que el token generado anteriormente
    const { uuid } = jwt.verify(token, config.SECRET_JWT) as { uuid: string };

    // leer el usuario que corresponde al uuid
    const user = await User.findById(uuid);

    if (!user) {
      res.status(401).json({
        msg: 'Token no valido - Usuario no existente en DB',
      });
      return;
    }

    // verificar si el uuid tiene estado en true
    if (!user.state) {
      res.status(401).json({
        msg: 'Token no valido - user state false',
      });
      return;
    }

    req.user = user;

    next();
  } catch (error: any) {
    res.status(401).json({
      msg: 'Token no valido',
    });
  }
};
