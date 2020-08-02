import {Inject} from 'injection-js';
import {AnalyzeArticleController} from '../controller/analyze-article.controller';
import {BaseRouter} from './base.router';
const Endpoints = require('../../common/api/endpoints');

export class ApiRouter extends BaseRouter {
  static get parameters() {
    return [new Inject(AnalyzeArticleController)];
  }

  constructor(articleController) {
    super();
    this.articleController = articleController;
  }

  getHandlers() {
    return [[Endpoints.AnalyzeArticle, this.articleController]];
  }
}
