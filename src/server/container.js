import {ArticleService} from './service/article.service';
import {MeaningCloudService} from './service/meaning-cloud.service';
import {AnalyzeArticleController} from './controller/analyze-article.controller';
import {ApiRouter} from './route/api.router';
import {Server} from './server';
import {ArticleParser} from './util/article.parser';
import {ReflectiveInjector} from 'injection-js';

const controllers = [AnalyzeArticleController];
const routers = [ApiRouter];
const services = [ArticleService, MeaningCloudService];
const util = [ArticleParser];

const declarations = [...controllers, ...routers, ...services, ...util, Server];

export const container = ReflectiveInjector.resolveAndCreate(declarations);
