import '../styles/main.scss';
import '@abraham/reflection';
import { ReflectiveInjector } from 'injection-js';
import { Client } from './client';
import { declarations } from './declarations';

function start() {
  const client: Client = ReflectiveInjector.resolveAndCreate(declarations).get(Client);
  client.init();
}

start();
