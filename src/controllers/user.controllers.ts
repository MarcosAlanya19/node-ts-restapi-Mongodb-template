import { Request, Response } from 'express';
import { User } from '../database/user.schema';
import * as usersService from '../services/user.service';

export const usersCtrlGet = async (req: Request, res: Response) => {
  try {
    const posts = await usersService.getAllUsers();
    res.status(200).send(posts);
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
    return;
  }
};

export const userCtrlPost = async (req: Request, res: Response) => {
  const body = req.body;
  const user = new User(body);

  try {
    await user.save();
    res.json({
      msg: 'post API - controller',
      user,
    });
  } catch (error: any) {
    res.json({ error: error.message });
    return;
  }
};

export const userCtrlPut = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatePost = await usersService.updateUserById(id, req.body);

    res.status(200).json(updatePost);
    return;
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const userCtrlDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletePost = await usersService.deleteUserById(id);
    if (!deletePost) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
    return;
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
