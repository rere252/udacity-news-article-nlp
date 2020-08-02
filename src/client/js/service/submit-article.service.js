import {BaseHttpService} from '../../../common/service/base-http.service';
import swal from 'sweetalert';
const Endpoints = require('../../../common/api/endpoints');

export class SubmitArticleService extends BaseHttpService {
  constructor() {
    super();
    this.endpoint = `${Endpoints.Prefix}${Endpoints.AnalyzeArticle}`;
  }

  submitArticle(articleUrl) {
    return this.axios
      .post(this.endpoint, {
        url: articleUrl
      })
      .then((r) => r.data)
      .catch((e) => {
        const error = e.response.data;
        swal(error.message, error.reason, 'error');
      });
  }
}
