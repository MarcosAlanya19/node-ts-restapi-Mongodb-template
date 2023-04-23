import { Request, Response } from 'express';
import { RequestWithUUID } from '../interface';
import * as userService from '../services/user.service';

// Controlador para obtener todos los usuarios
export const usersCtrlGet = async (req: Request, res: Response): Promise<void> => {
  const [total, user] = await userService.getAllUsers(req);

  try {
    res.status(200).json({ total, user });
    return;
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
    return;
  }
};

// Controlador para crear un nuevo usuario
export const userCtrlPost = async (req: Request, res: Response): Promise<void> => {
  const user = await userService.createNewUser(req.body);

  try {
    res.status(201).json({ user });
    return;
  } catch (error: any) {
    res.json({ error: error.message });
    return;
  }
};

// Controlador para actualizar un usuario
export const userCtrlPut = async (req: Request, res: Response): Promise<void> => {
  const user = await userService.updateUserById(req);

  try {
    res.json({ user });
    return;
  } catch (error: any) {
    res.json({ error: error.message });
    return;
  }
};

// Controlador para eliminar un usuario
export const userCtrlDelete = async (
  req: RequestWithUUID,
  res: Response
): Promise<void> => {
  const user = await userService.deleteUserById(req);

  try {
    res.status(200).json({
      user,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
    return;
  }
};
