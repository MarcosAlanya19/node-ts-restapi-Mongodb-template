import cors from 'cors';
import express from 'express';
import { dbConnection } from '../database/config.db';
import { router as userRouter } from '../routes/user.routes';

interface ServerConfig {
  port: string;
  userPath: string;
}

export const serverConfig = {
  port: process.env.PORT ?? '3000',
  userPath: '/api/users',
};

export class Server {
  private app: express.Application;

  constructor(private config: ServerConfig) {
    this.app = express();

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  };

  private routes = (): void => {
    this.app.use(this.config.userPath, userRouter);
  };

  public listen = (): void => {
    this.app.listen(this.config.port, () => {
      console.log(`Server listening on port ${this.config.port}`);
    });
  };
}
