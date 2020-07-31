import { AnalyzeArticleController } from '../controller/analyze-article.controller';
import { Injectable } from 'injection-js';
import { BaseRouter } from './base.router';
import { BaseController } from '../controller/base.controller';
import { Endpoints } from '../../common/api/endpoints';

@Injectable()
export class ApiRouter extends BaseRouter {
  constructor(private articleController: AnalyzeArticleController) {
    super();
  }

  getHandlers(): [string, BaseController][] {
    return [[Endpoints.AnalyzeArticle, this.articleController]];
  }
}
