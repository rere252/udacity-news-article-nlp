import {BaseHttpService} from '../../common/service/base-http.service';

export class MeaningCloudService extends BaseHttpService {
  constructor() {
    super();
    this.apiURL = 'https://api.meaningcloud.com/sentiment-2.1';
    this.apiKey = process.env.MEANING_CLOUD_API_KEY;
  }

  analyzeSentiment(parsedArticle, testKey) {
    return this.axios
      .post(
        this.apiURL,
        null,
        // For some reason Meaning Cloud wants all the data by query params.
        {
          params: {
            key: testKey ? testKey : this.apiKey,
            lang: 'en',
            txt: parsedArticle.content,
            txtf: 'markup'
          }
        }
      )
      .then((r) => ({
        ...this.removeExcessProperties(r.data),
        articleTitle: parsedArticle.title,
        editor: parsedArticle.editor
      }))
      .catch(() => {
        throw new Error('Failed analyze article sentiment.');
      });
  }

  /**
   * The API returns a lot of stuff we don't need to send to the client.
   * This explecitly keeps only the needed props.
   */
  removeExcessProperties(sentimentAnalysisResponse) {
    const {agreement, confidence, irony, score_tag, subjectivity} = sentimentAnalysisResponse;
    return {
      agreement,
      confidence,
      irony,
      score_tag,
      subjectivity
    };
  }
}
