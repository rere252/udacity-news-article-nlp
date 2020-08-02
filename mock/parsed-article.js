import {ParsedArticle} from '../src/server/model/parsed-article.model';
import * as fs from 'fs';
import * as path from 'path';

export const content = fs.readFileSync(path.resolve(__dirname, 'parsed-content.txt'), 'utf8').replace('\\', '');

export const parsedArticle = new ParsedArticle(
  'Cinema chief: Current purpose is simply survival',
  content,
  'Katriin Eikin Sein'
);
