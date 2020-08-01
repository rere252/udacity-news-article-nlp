import { SubmitArticleService } from './service/submit-article.service';
import { Injectable } from 'injection-js';
import { TwoPanelComponent } from './components/two-panel.component';
import { ArticleUrlFormComponent } from './components/article-url-form.component';
import { ArticleSentimentComponent } from './components/article-sentiment.component';
import { BaseComponent } from './components/base-component';
import { FooterComponent } from './components/footer.component';
import { SentimentAnalysisResponse } from '../../common/model/sentiment-analysis.response';

@Injectable()
export class Client {
  constructor(private articleService: SubmitArticleService) {}

  init(): void {
    this.initComponents();
  }

  private initComponents(): void {
    const formPanel = new ArticleUrlFormComponent(this.articleService);
    const sentimentPanel = new ArticleSentimentComponent();
    const twoPanel = new TwoPanelComponent('ERR Article Sentiment Analysis App', formPanel, sentimentPanel);
    formPanel.onSentimentAnalyzed = (resp) => this.onAnalyzed(twoPanel, resp);
    const footer = new FooterComponent();
    this.attachToMain(twoPanel, footer);
  }

  private attachToMain(...comps: BaseComponent[]): void {
    const fragment = new DocumentFragment();
    for (const comp of comps) {
      fragment.appendChild(comp.toElement());
    }
    const main = document.querySelector('main');
    main.appendChild(fragment);
    for (const comp of comps) {
      comp.onAttached();
    }
  }

  private onAnalyzed(twoPanel: TwoPanelComponent, resp: SentimentAnalysisResponse) {
    twoPanel.updateRightPanel(new ArticleSentimentComponent(resp));
  }
}
