import { BaseHttpService } from '../../../common/service/base-http.service';
import { Endpoints } from '../../../common/api/endpoints';
import { ERRAnalysisResponse } from '../../../common/model/err-analysis.response';

export class SubmitArticleService extends BaseHttpService {
  private readonly endpoint = `${Endpoints.Prefix}${Endpoints.AnalyzeArticle}`;

  analyzeArticle(articleUrl: string): Promise<ERRAnalysisResponse> {
    return this.axios
      .post(this.endpoint, {
        url: articleUrl
      })
      .then((r) => r.data);
  }
}
