import {Inject} from 'injection-js';
import {BaseHttpService} from '../../common/service/base-http.service';
import {ArticleParser} from '../util/article.parser';

export class ArticleService extends BaseHttpService {
  static get parameters() {
    return [new Inject(ArticleParser)];
  }

  constructor(parser) {
    super();
    this.parser = parser;
  }

  getArticle(req) {
    return this.axios.get(req.url).then((resp) => this.parser.parseArticle(resp.data));
  }
}
