/* eslint-disable no-undef */
import {container} from '../src/client/js/container';
import {SubmitArticleService} from '../src/client/js/service/submit-article.service';
import axios from 'axios';
import {ERRAnalysisResponse} from '../src/common/model/err-analysis.response';
import {Agreement} from '../src/common/model/enum/agreement.enum';
import {Irony} from '../src/common/model/enum/irony.enum';
import {ScoreTag} from '../src/common/model/enum/score-tag.enum';
import {Subjectivity} from '../src/common/model/enum/subjectivity.enum';
const Endpoints = require('../src/common/api/endpoints');


jest.mock('axios');

describe('Client-side services', () => {
  test('Article submission', () => {
    const submitArticle = container.get(SubmitArticleService);
    const expected = ERRAnalysisResponse(
      Agreement.Disagreement,
      86,
      Irony.NonIronic,
      ScoreTag.Negative,
      Subjectivity.Subjective,
      'Cinema chief: Current purpose is simply survival',
      'Katriin Eikin Sein'
    );
    axios.post.mockResolvedValueOnce({data: expected});
    const testUrl = 'https://news.err.ee/1119178/cinema-chief-current-purpose-is-simply-survival';
    return submitArticle.submitArticle(testUrl).then((result) => {
      expect(axios.post).toHaveBeenCalledWith(`${Endpoints.Prefix}${Endpoints.AnalyzeArticle}`, {url: testUrl});
      expect(result).toEqual(expected);
    });
  });
});
