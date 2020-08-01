import { BaseComponent } from './base-component';
import { TextInputComponent } from './text-input.component';
import { SubmitButtonComponent } from './submit-button.component';
import { SubmitArticleService } from '../service/submit-article.service';
import { SentimentAnalysisResponse } from '../../../common/model/sentiment-analysis.response';

export class ArticleUrlFormComponent extends BaseComponent {
  private urlField: TextInputComponent;
  private analyzeButton: SubmitButtonComponent;
  private _onSentimentAnalyzed: (resp: SentimentAnalysisResponse) => void;
  set onSentimentAnalyzed(cb: (resp: SentimentAnalysisResponse) => void) {
    this._onSentimentAnalyzed = cb;
  }

  constructor(private articleService: SubmitArticleService) {
    super('errUrlForm');
    this.urlField = new TextInputComponent('ERR News Article URL', 'url', 'https://news.err.ee/...', 'errURLField');
    this.analyzeButton = new SubmitButtonComponent('Analyze Article');
  }

  getChildren(): BaseComponent[] {
    return [this.urlField, this.analyzeButton];
  }

  getTemplate(): string {
    return `
      <form id="${this.id}" class="app__form-container">
        ${this.urlField.getTemplate()}
        ${this.analyzeButton.getTemplate()}
      </form>
    `;
  }

  onAttached(): void {
    super.onAttached();
    this.listenFormSubmit();
  }

  private listenFormSubmit(): void {
    this.nativeElement.addEventListener('submit', (e) => this.onSubmit(e));
  }

  private onSubmit(e: Event): void {
    e.preventDefault();
    this.articleService.analyzeArticle(this.urlField.nativeElement.value).then((res) => this._onSentimentAnalyzed(res));
  }
}
