import { Client } from './client';
import { SubmitArticleService } from './service/submit-article.service';
import { ReflectiveInjector } from 'injection-js';

const declarations = [Client, SubmitArticleService];

export const container = ReflectiveInjector.resolveAndCreate(declarations);
