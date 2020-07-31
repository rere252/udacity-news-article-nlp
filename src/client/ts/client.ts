import { SubmitArticleService } from './service/submit-article.service';
import { Injectable } from 'injection-js';

@Injectable()
export class Client {
  constructor(private articleService: SubmitArticleService) {}

  init(): void {
    this.listenFormSubmit();
  }

  private listenFormSubmit(): void {
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', this.onSubmit);
  }

  private onSubmit(e: Event): void {
    console.log(e);
  }
}
