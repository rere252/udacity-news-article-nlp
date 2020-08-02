/* eslint-disable no-undef */
import {ArticleParser} from '../src/server/util/article.parser';
import * as fs from 'fs';
import * as path from 'path';
import {parsedArticle as mockArticle} from '../mock/parsed-article';
import {container} from '../src/server/container';
import {ArticleService} from '../src/server/service/article.service';
import axios from 'axios';
import {SubmitArticleRequest} from '../src/common/model/submit-article.request';
import {MeaningCloudService} from '../src/server/service/meaning-cloud.service';
import {ParsedArticle} from '../src/server/model/parsed-article.model';
import {ERRAnalysisResponse} from '../src/common/model/err-analysis.response';
import {Agreement} from '../src/common/model/enum/agreement.enum';
import {Irony} from '../src/common/model/enum/irony.enum';
import {ScoreTag} from '../src/common/model/enum/score-tag.enum';
import {Subjectivity} from '../src/common/model/enum/subjectivity.enum';

jest.mock('axios');

describe('Server-side services', () => {
  const errArticle = fs.readFileSync(path.resolve(__dirname, '../mock/err-article.txt'), 'utf8');

  test('ERR response gets correctly parsed', () => {
    const parser = container.get(ArticleParser);
    const fullParse = parser.parseArticle(errArticle);
    expect(() => parser.parseArticle('a')).toThrow();
    expect(() => parser.parseArticle(null)).toThrow();
    expect(fullParse.editor).toEqual(mockArticle.editor);
    expect(fullParse.title).toEqual(mockArticle.title);
    // Slicing becacuse of misc slash related issues.
    expect(fullParse.content.slice(0, 200)).toEqual(mockArticle.content.slice(0, 200));
  });

  test('Article service', () => {
    const articleService = container.get(ArticleService);
    const articleReq = new SubmitArticleRequest('https://news.err.ee/1119178/cinema-chief-current-purpose-is-simply-survival');
    axios.get.mockResolvedValueOnce({data: errArticle});
    return articleService.getArticle(articleReq).then(() => {
      expect(axios.get).toHaveBeenCalledWith(articleReq.url);
    });
  });

  test('Meaning Cloud service', () => {
    const meaninCloud = container.get(MeaningCloudService);
    const parsedArticle = new ParsedArticle(
      'Some Title',
      'A short article.',
      'The Best Editor'
    );
    const meaningResp = {
      data: {
        agreement: 'AGREEMENT',
        confidence: 86,
        irony: 'NONIRONIC',
        score_tag: 'P+',
        subjectivity: 'SUBJECTIVE'
      }
    };
    const mockResp = new ERRAnalysisResponse(
      Agreement.Agreement,
      86,
      Irony.NonIronic,
      ScoreTag.StrongPositive,
      Subjectivity.Subjective,
      parsedArticle.title,
      parsedArticle.editor
    );
    const fakeKey = '1112222333';
    axios.post.mockResolvedValueOnce(meaningResp);
    return meaninCloud.analyzeSentiment(parsedArticle, fakeKey).then((servResp) => {
      expect(axios.post).toHaveBeenCalledWith('https://api.meaningcloud.com/sentiment-2.1', null, {
        params: {key: fakeKey, lang: 'en', txt: parsedArticle.content, txtf: 'markup'}
      });
      expect(servResp).toEqual(mockResp);
    });
  });
});
