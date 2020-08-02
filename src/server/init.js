import {Server} from './server';
import * as dotenv from 'dotenv';
import {container} from './container';

function start() {
  dotenv.config();
  if (!process.env.MEANING_CLOUD_API_KEY) {
    throw new Error(
      'Missing "MEANING_CLOUD_API_KEY". Please add it to the .env file or provide it from the commandline.'
    );
  }
  const server = container.get(Server);
  server.init();
}

start();
