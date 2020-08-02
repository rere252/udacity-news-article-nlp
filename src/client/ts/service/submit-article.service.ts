import { BaseHttpService } from '../../../common/service/base-http.service';
import { Endpoints } from '../../../common/api/endpoints';
import { ERRAnalysisResponse } from '../../../common/model/err-analysis.response';
import { SimpleError } from '../../../common/model/simple.error';
import swal from 'sweetalert';
import { Injectable } from 'injection-js';

@Injectable()
export class SubmitArticleService extends BaseHttpService {
  private readonly endpoint = `${Endpoints.Prefix}${Endpoints.AnalyzeArticle}`;

  submitArticle(articleUrl: string): Promise<ERRAnalysisResponse> {
    return this.axios
      .post(this.endpoint, {
        url: articleUrl
      })
      .then((r) => r.data)
      .catch((e) => {
        const error: SimpleError = e.response.data;
        swal(error.message, error.reason, 'error');
      });
  }
}
