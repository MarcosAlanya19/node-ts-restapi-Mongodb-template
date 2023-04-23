import { Request } from 'express';
type ObjectId = import('mongoose').Types.ObjectId;

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN_ROLE' | 'USER_ROLE';
  state: boolean;
  google: boolean;
  __v: number;
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
