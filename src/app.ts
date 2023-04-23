import { config } from './config';
import { Server } from './server';

const serverConfig = {
  port: config.PORT.toString() ?? '3000',
  userPath: '/api/users',
  authPath: '/api/auth',
};

const server = new Server(serverConfig);

server.listen();
