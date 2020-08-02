import {BaseComponent} from './base-component';
import {Irony} from '../../../common/model/enum/irony.enum';
import {ScoreTag} from '../../../common/model/enum/score-tag.enum';

export class ArticleSentimentComponent extends BaseComponent {
  get subjectivity() {
    return this.sentiment.subjectivity.toLowerCase();
  }

  get irony() {
    switch (this.sentiment.irony) {
      case Irony.Ironic:
        return 'ironic';
      case Irony.NonIronic:
        return 'non-ironic';
      default:
        throw new TypeError('Invalid Irony')
    }
  }

  get agreement() {
    return this.sentiment.agreement.toLowerCase();
  }

  get scoreTag() {
    switch (this.sentiment.score_tag) {
      case ScoreTag.StrongPositive:
        return 'strongly positive';
      case ScoreTag.Positive:
        return 'positive';
      case ScoreTag.Neutral:
        return 'neutral';
      case ScoreTag.Negative:
        return 'negative';
      case ScoreTag.StrongNegative:
        return 'strongly negative';
      case ScoreTag.WithoutSentiment:
        return 'none';
      default:
        throw new TypeError('Invalid score_tag')
    }
  }

  constructor(sentiment) {
    super();
    this.sentiment = sentiment;
  }

  getTemplate() {
    return this.sentiment
      ? `
      <div class="article-sentiment">
        <h2 class="article-sentiment__title">${this.sentiment.articleTitle}</h2>
        <div class="article-sentiment__editor">editor: ${this.sentiment.editor}</div> 
        <ul class="article-sentiment__results">
          <li>Sentiment: ${this.scoreTag}</li>
          <li>Confidence: ${this.sentiment.confidence}</li>
          <li>Subjectivity: ${this.subjectivity}</li>
          <li>Ironic: ${this.irony}</li>
          <li>Agreement: ${this.agreement}</li>
        </ul>
      </div>
    `
      : '';
  }
}
