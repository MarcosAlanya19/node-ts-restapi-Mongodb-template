import dotenv from 'dotenv';
import { Server, serverConfig } from './server';

dotenv.config();

const server = new Server(serverConfig);

server.listen();
