import {parse} from 'node-html-parser';

export class ArticleParser {
  constructor() {
    this.mobileAppAddStart = '<em>Download the ERR News app';
  }

  parseArticle(rawHTMLString) {
    try {
      console.log('-- Attempting to parse article --');
      const parsedHTML = parse(rawHTMLString);
      const article = parsedHTML.querySelector('article');
      const title = this.getTitle(article);
      const editor = this.getEditor(article);
      const paragraphs = this.getParagraphs(article);
      if (!title || !editor || !paragraphs) {
        this.throwError();
      }
      console.log(`Parsed ${title}, ${editor}`);
      return {
        title,
        editor,
        content: paragraphs
      };
    } catch (e) {
      this.throwError();
    }
  }

  throwError() {
    throw new Error('ERR article in unexpected format');
  }

  getTitle(articleElement) {
    const headerEl = articleElement.querySelector('header');
    const heading = headerEl.querySelector('h1');
    const undesiredHeading = heading.querySelector('a');
    heading.removeChild(undesiredHeading);
    return heading.text.trim();
  }

  getEditor(articleElement) {
    const editorParagraph = articleElement.querySelector('.editor');
    return editorParagraph.querySelector('span').text.trim();
  }

  getParagraphs(articleElement) {
    return articleElement
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
