import { BaseHttpService } from '../../../common/service/base-http.service';
import { Endpoints } from '../../../common/api/endpoints';
import { SentimentAnalysisResponse } from '../../../common/model/sentiment-analysis.response';

export class SubmitArticleService extends BaseHttpService {
  private readonly endpoint = `${Endpoints.Prefix}${Endpoints.AnalyzeArticle}`;

  analyzeArticle(articleUrl: string): Promise<SentimentAnalysisResponse> {
    return this.axios
      .post(this.endpoint, {
        url: articleUrl
      })
      .then((r) => r.data);
  }
}
