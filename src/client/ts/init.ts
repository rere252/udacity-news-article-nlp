import '../styles/main.scss';
import '@abraham/reflection';
import { ReflectiveInjector } from 'injection-js';
import { Client } from './components/client';
import { declarations } from './declarations';

const client: Client = ReflectiveInjector.resolveAndCreate(declarations).get(Client);
client.init();
