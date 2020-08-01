import { BaseComponent } from './base-component';
import { SentimentAnalysisResponse } from '../../../common/model/sentiment-analysis.response';

export class ArticleSentimentComponent extends BaseComponent {
  constructor(private sentiment: SentimentAnalysisResponse) {
    super();
  }

  getTemplate(): string {
    return this.sentiment
      ? `
      <h2 class="article-title">PLACEHOLDER</h2>
      <ul>
        <li>Subjectivity: ${this.sentiment?.subjectivity}</li>
      </ul>
    `
      : '';
  }
}
