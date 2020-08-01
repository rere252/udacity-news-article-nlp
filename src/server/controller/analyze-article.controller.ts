import { Injectable } from 'injection-js';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';
import { ArticleService } from '../service/article.service';
import { SubmitArticleRequest } from '../../common/model/submit-article.request';
import { MeaningCloudService } from '../service/meaning-cloud.service';

@Injectable()
export class AnalyzeArticleController extends BaseController {
  constructor(private articleService: ArticleService, private meaningCloudService: MeaningCloudService) {
    super();
  }

  handle(req: Request, resp: Response): void {
    const sar: SubmitArticleRequest = req.body;
    this.articleService
      .getArticle(sar)
      .then((parsed) => this.meaningCloudService.analyzeSentiment(parsed))
      .then((result) => resp.send(result))
      .catch((e) => {
        console.error(e.response);
        resp.sendStatus(500);
      });
  }
}
