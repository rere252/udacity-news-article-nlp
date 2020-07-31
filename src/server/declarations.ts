import { ArticleService } from './service/article.service';
import { MeaningCloudService } from './service/meaning-cloud.service';
import { AnalyzeArticleController } from './controller/analyze-article.controller';
import { ApiRouter } from './route/api.router';
import { Server } from './server';
import { ArticleParser } from './util/article.parser';

const controllers = [AnalyzeArticleController];
const routers = [ApiRouter];
const services = [ArticleService, MeaningCloudService];
const util = [ArticleParser];

export const declarations = [...controllers, ...routers, ...services, ...util, Server];
