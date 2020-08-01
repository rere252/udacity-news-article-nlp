import '@abraham/reflection';
import { ReflectiveInjector } from 'injection-js';
import { declarations } from './declarations';
import { Server } from './server';
import * as dotenv from 'dotenv';

function start() {
  dotenv.config();
  if (!process.env.MEANING_CLOUD_API_KEY) {
    throw new Error(
      'Missing "MEANING_CLOUD_API_KEY". Please add it to the .env file or provide it from the commandline.'
    );
  }
  const server: Server = ReflectiveInjector.resolveAndCreate(declarations).get(Server);
  server.init();
}

start();
