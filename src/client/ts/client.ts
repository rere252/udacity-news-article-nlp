import { SubmitArticleService } from './service/submit-article.service';
import { Injectable } from 'injection-js';
import { TwoPanelComponent } from './components/two-panel.component';
import { ArticleUrlFormComponent } from './components/article-url-form.component';
import { ArticleSentimentComponent } from './components/article-sentiment.component';
import { FooterComponent } from './components/footer.component';
import { ERRAnalysisResponse } from '../../common/model/err-analysis.response';

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
    this.attachComponents(twoPanel, footer);
  }

  private attachComponents(twoPanel: TwoPanelComponent, footer: FooterComponent): void {
    const fragment = new DocumentFragment();
    const main = document.createElement('main');
    main.appendChild(twoPanel.toElement());
    fragment.appendChild(main);
    fragment.appendChild(footer.toElement());
    document.body.appendChild(fragment);
    twoPanel.onAttached();
    footer.onAttached();
  }

  private onAnalyzed(twoPanel: TwoPanelComponent, resp: ERRAnalysisResponse) {
    twoPanel.updateRightPanel(new ArticleSentimentComponent(resp));
    twoPanel.leftPanel.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
