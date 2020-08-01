import { BaseComponent } from './base-component';
import { TextInputComponent } from './text-input.component';
import { SubmitButtonComponent } from './submit-button.component';
import { SubmitArticleService } from '../service/submit-article.service';
import { ERRAnalysisResponse } from '../../../common/model/err-analysis.response';

export class ArticleUrlFormComponent extends BaseComponent {
  private urlField: TextInputComponent;
  private analyzeButton: SubmitButtonComponent;
  private _onSentimentAnalyzed: (resp: ERRAnalysisResponse) => void;
  private readonly loaderID = 'loader';
  private readonly loadingClass = 'loading';
  private loaderDIV: HTMLElement;
  set onSentimentAnalyzed(cb: (resp: ERRAnalysisResponse) => void) {
    this._onSentimentAnalyzed = cb;
  }
  get isLoading(): boolean {
    return this.loaderDIV.classList.contains(this.loadingClass);
  }

  constructor(private articleService: SubmitArticleService) {
    super('errUrlForm');
    this.urlField = new TextInputComponent('ERR News Article URL', 'url', 'https://news.err.ee/...', 'errURLField');
    this.analyzeButton = new SubmitButtonComponent('submitArticleButton', 'Analyze');
  }

  getChildren(): BaseComponent[] {
    return [this.urlField, this.analyzeButton];
  }

  getTemplate(): string {
    return `
      <form id="${this.id}" class="url-form">
        ${this.urlField.getTemplate()}
        <div id="${this.loaderID}"></div>
        ${this.analyzeButton.getTemplate()}
      </form>
    `;
  }

  onAttached(): void {
    super.onAttached();
    this.listenFormSubmit();
    this.loaderDIV = document.getElementById(this.loaderID);
  }

  private listenFormSubmit(): void {
    this.nativeElement.addEventListener('submit', (e) => this.onSubmit(e));
  }

  private toggleLoading() {
    const button = this.analyzeButton.nativeElement;
    button.disabled = !button.disabled;
    this.loaderDIV.classList.toggle(this.loadingClass);
  }

  private onSubmit(e: Event): void {
    e.preventDefault();
    if (this.isLoading) {
      return;
    }
    this.toggleLoading();
    this.articleService
      .analyzeArticle(this.urlField.nativeElement.value)
      .then((res) => {
        this._onSentimentAnalyzed(res);
      })
      .finally(() => this.toggleLoading());
  }
}
