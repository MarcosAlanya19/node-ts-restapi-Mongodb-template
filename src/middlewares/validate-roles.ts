import { NextFunction, Response } from 'express';
import { RequestWithUUID, Role } from '../interface';

export const isAdminRole = (
  req: RequestWithUUID,
  res: Response,
  next: NextFunction
) => {
  // Verificar de que !req.user exista
  if (!req.user) {
    res.status(500).json({
      msg: 'Se quiere validar, sin saber el role correcto',
    });
    return;
  }

  const { role, name } = req.user;

  // Verifica que especificamente el rol es admin
  if (role !== Role.ADMIN) {
    res.status(401).json({
      msg: `${name} no es administrador - No tiene acceso`,
    });
    return;
  }

  next();
};

export const haveRole = (...roles: Role[]) => {
  return (req: RequestWithUUID, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(500).json({
        msg: 'Se quiere validar, sin saber el role correcto',
      });
      return;
    }

    // realiza una verificacion en caso se brinde un role, no existente
    if (!roles.includes(req.user.role)) {
      res
        .status(401)
        .json({ msg: `El servicio requiere uno de estos roles [ ${roles} ]` });
      return;
    }

    next();
  };
};
