import { Injectable } from 'injection-js';
import { parse } from 'node-html-parser';

@Injectable()
export class ArticleParser {
  private readonly mobileAppAddStart = '<em>Download the ERR News app';

  public parseArticle(rawHTML: string): string {
    try {
      console.log('-- Attempting to parse article --');
      const parsedHTML = parse(rawHTML);
      const article = parsedHTML.querySelector('article');
      const paragraphs = article
        .querySelectorAll('p')
        .map((p) => {
          if (p.innerHTML.startsWith(this.mobileAppAddStart)) {
            return '';
          }
          return p.innerHTML.trim();
        })
        .join('');
      return paragraphs;
    } catch (e) {
      throw new Error(`Failed to parse article, rawHtml: ${rawHTML}`);
    }
  }
}
