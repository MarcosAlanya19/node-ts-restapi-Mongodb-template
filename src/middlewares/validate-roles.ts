import { NextFunction, Response } from 'express';
import { config } from '../config';
import { RequestWithUUID } from '../interface';

export const isAdminRole = (
  req: RequestWithUUID,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(500).json({
      msg: 'Se quiere validar, sin saber el role correcto',
    });
    return;
  }

  const { role, name } = req.user;

  if (role !== config.ROLES.ADMIN_ROLE) {
    res.status(401).json({
      msg: `${name} no es administrador - No tiene acceso`,
    });
    return;
  }

  next();
};

export const haveRole = (...roles: string[]) => {
  return (req: RequestWithUUID, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(500).json({
        msg: 'Se quiere validar, sin saber el role correcto',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res
        .status(401)
        .json({ msg: `El servicio requiere uno de estos roles [ ${roles} ]` });
      return;
    }

    next();
  };
};
