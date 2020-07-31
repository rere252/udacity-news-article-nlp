import { BaseHttpService } from '../../common/service/base-http.service';
import { Injectable } from 'injection-js';
import { SentimentAnalysisResponse } from '../../common/model/sentiment-analysis.response';
import { AxiosResponse } from 'axios';

@Injectable()
export class MeaningCloudService extends BaseHttpService {
  private readonly apiURL = 'https://api.meaningcloud.com/sentiment-2.1';
  private readonly apiKey = process.env.MEANING_CLOUD_API_KEY;

  analyzeSentiment(htmlString: string): Promise<SentimentAnalysisResponse> {
    console.log(this.apiKey);
    console.log(htmlString);
    return this.axios
      .post(
        this.apiURL,
        null,
        // For some reason Meaning Cloud wants all the data by query params.
        {
          params: {
            key: this.apiKey,
            lang: 'en',
            txt: htmlString,
            txtf: 'markup'
          }
        }
      )
      .then((r: AxiosResponse<SentimentAnalysisResponse>) => r.data);
  }
}
