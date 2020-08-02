import {Inject} from 'injection-js';
import {ArticleService} from '../service/article.service';
import {MeaningCloudService} from '../service/meaning-cloud.service';
import {BaseController} from './base.controller';

export class AnalyzeArticleController extends BaseController {
  static get parameters() {
    return [new Inject(ArticleService), new Inject(MeaningCloudService)];
  }

  constructor(articleService, meaningCloudService) {
    super();
    this.articleService = articleService;
    this.meaningCloudService = meaningCloudService;
  }

  handle(req, resp, next) {
    const sar = req.body;
    this.articleService
      .getArticle(sar)
      .then((parsed) => this.meaningCloudService.analyzeSentiment(parsed))
      .then((result) => resp.send(result))
      .catch((e) => next(e));
  }
}
