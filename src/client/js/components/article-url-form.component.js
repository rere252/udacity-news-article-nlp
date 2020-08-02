import {BaseComponent} from './base-component';
import {TextInputComponent} from './text-input.component';
import {SubmitButtonComponent} from './submit-button.component';
import {SubmitArticleService} from '../service/submit-article.service';
import {Inject} from 'injection-js';

export class ArticleUrlFormComponent extends BaseComponent {
  static get parameters() {
    return [new Inject(SubmitArticleService)];
  }

  set onSentimentAnalyzed(cb) {
    this._onSentimentAnalyzed = cb;
  }

  get isLoading() {
    return this.loaderDIV.classList.contains(this.loadingClass);
  }

  constructor(articleService) {
    super('errUrlForm');
    this.articleService = articleService;
    this._onSentimentAnalyzed;
    this.loaderID = 'loader';
    this.loadingClass = 'loading';
    this.loaderDIV;

    const errUrlPattern = /https:\/\/news.err.ee\/\d+\/.+/;
    this.urlField = new TextInputComponent(
      'ERR News Article URL',
      'url',
      'https://news.err.ee/...',
      errUrlPattern,
      'https://news.err.ee/11193...',
      'errURLField'
    );
    this.analyzeButton = new SubmitButtonComponent('submitArticleButton', 'Analyze');
  }

  getChildren() {
    return [this.urlField, this.analyzeButton];
  }

  getTemplate() {
    return `
      <form id="${this.id}" class="url-form">
        ${this.urlField.getTemplate()}
        <div id="${this.loaderID}"></div>
        ${this.analyzeButton.getTemplate()}
      </form>
    `;
  }

  onAttached() {
    super.onAttached();
    this.listenFormSubmit();
    this.loaderDIV = document.getElementById(this.loaderID);
  }

  listenFormSubmit() {
    this.nativeElement.addEventListener('submit', (e) => this.onSubmit(e));
  }

  toggleLoading() {
    const button = this.analyzeButton.nativeElement;
    button.disabled = !button.disabled;
    this.loaderDIV.classList.toggle(this.loadingClass);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isLoading) {
      return;
    }
    this.toggleLoading();
    this.articleService
      .submitArticle(this.urlField.nativeElement.value)
      .then((res) => {
        this._onSentimentAnalyzed(res);
      })
      .finally(() => this.toggleLoading());
  }
}
