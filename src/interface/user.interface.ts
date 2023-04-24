import { Request } from 'express';
type ObjectId = import('mongoose').Types.ObjectId;

export enum Role {
  ADMIN = 'ADMIN_ROLE',
  USER = 'USER_ROLE',
  VENTAS = 'VENTAS_ROLE',
}

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  state: boolean;
  google: boolean;
}

export interface IUserPost {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserGet extends IUserPost {
  google?: boolean;
  img?: string;
}

export interface RequestWithUUID extends Request {
  // uuid?: any;
  user?: IUser;
}
