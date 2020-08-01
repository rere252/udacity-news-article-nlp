import { Injectable } from 'injection-js';
import { parse, HTMLElement } from 'node-html-parser';
import { ParsedArticle } from '../model/parsed-article.model';

@Injectable()
export class ArticleParser {
  private readonly mobileAppAddStart = '<em>Download the ERR News app';

  public parseArticle(rawHTML: string): ParsedArticle {
    try {
      console.log('-- Attempting to parse article --');
      const parsedHTML = parse(rawHTML);
      const article = parsedHTML.querySelector('article');
      const title = this.getTitle(article);
      const editor = this.getEditor(article);
      const paragraphs = this.getParagraphs(article);
      return {
        title,
        editor,
        content: paragraphs
      };
    } catch (e) {
      throw new Error(`Failed to parse article, rawHtml: ${rawHTML}`);
    }
  }

  private getTitle(article: HTMLElement): string {
    const headerEl = article.querySelector('header');
    const heading = headerEl.querySelector('h1');
    const undesiredHeading = heading.querySelector('a');
    heading.removeChild(undesiredHeading);
    return heading.text.trim();
  }

  private getEditor(article: HTMLElement): string {
    const editorParagraph = article.querySelector('.editor');
    return editorParagraph.querySelector('span').text.trim();
  }

  private getParagraphs(article: HTMLElement): string {
    return article
      .querySelectorAll('p')
      .map((p) => {
        if (p.innerHTML.startsWith(this.mobileAppAddStart)) {
          return '';
        }
        return p.innerHTML.trim();
      })
      .join('');
  }
}
