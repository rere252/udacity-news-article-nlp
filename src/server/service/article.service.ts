import { Injectable } from 'injection-js';
import { BaseHttpService } from '../../common/service/base-http.service';
import { SubmitArticleRequest } from '../../common/model/submit-article.request';
import { ArticleParser } from '../util/article.parser';

@Injectable()
export class ArticleService extends BaseHttpService {
  constructor(private parser: ArticleParser) {
    super();
  }

  getArticle(req: SubmitArticleRequest): Promise<string> {
    return this.axios.get(req.url).then((resp) => this.parser.parseArticle(resp.data));
  }
}
