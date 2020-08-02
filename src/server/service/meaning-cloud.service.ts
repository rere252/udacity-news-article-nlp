import { BaseHttpService } from '../../common/service/base-http.service';
import { Injectable } from 'injection-js';
import { SentimentAnalysisResponse } from '../../common/model/sentiment-analysis.response';
import { AxiosResponse } from 'axios';
import { ParsedArticle } from '../model/parsed-article.model';
import { ERRAnalysisResponse } from '../../common/model/err-analysis.response';

@Injectable()
export class MeaningCloudService extends BaseHttpService {
  private readonly apiURL = 'https://api.meaningcloud.com/sentiment-2.1';
  private readonly apiKey = process.env.MEANING_CLOUD_API_KEY;

  analyzeSentiment(article: ParsedArticle, testKey?: string): Promise<ERRAnalysisResponse> {
    return this.axios
      .post(
        this.apiURL,
        null,
        // For some reason Meaning Cloud wants all the data by query params.
        {
          params: {
            key: testKey ? testKey : this.apiKey,
            lang: 'en',
            txt: article.content,
            txtf: 'markup'
          }
        }
      )
      .then((r: AxiosResponse<SentimentAnalysisResponse>) => ({
        ...this.removeExcessProperties(r.data),
        articleTitle: article.title,
        editor: article.editor
      }))
      .catch(() => {
        throw new Error('Failed analyze article sentiment.');
      });
  }

  /**
   * The API returns a lot of stuff we don't need to send to the client.
   * This explecitly keeps only the needed props.
   */
  private removeExcessProperties(resp: SentimentAnalysisResponse): SentimentAnalysisResponse {
    const { agreement, confidence, irony, score_tag, subjectivity } = resp;
    return {
      agreement,
      confidence,
      irony,
      score_tag,
      subjectivity
    };
  }
}
