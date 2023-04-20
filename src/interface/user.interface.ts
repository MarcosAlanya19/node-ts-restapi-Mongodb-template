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
