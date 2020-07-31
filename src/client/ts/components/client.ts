import { SubmitArticleService } from '../service/submit-article.service';
import { Injectable } from 'injection-js';

@Injectable()
export class Client {
  constructor(private submitArticle: SubmitArticleService) {}

  init(): void {
    console.log('init');
  }
}
