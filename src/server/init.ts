import '@abraham/reflection';
import { ReflectiveInjector } from 'injection-js';
import { declarations } from './declarations';
import { Server } from './server';
import * as dotenv from 'dotenv';

function start() {
  dotenv.config();
  const server: Server = ReflectiveInjector.resolveAndCreate(declarations).get(Server);
  server.init();
}

start();
