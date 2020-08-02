import 'reflect-metadata';
import { container } from '../src/client/ts/container';
import { SubmitArticleService } from '../src/client/ts/service/submit-article.service';
import Axios from 'axios';
import { ERRAnalysisResponse } from '../src/common/model/err-analysis.response';
import { Agreement } from '../src/common/model/enum/agreement.enum';
import { Irony } from '../src/common/model/enum/irony.enum';
import { ScoreTag } from '../src/common/model/enum/score-tag.enum';
import { Subjectivity } from '../src/common/model/enum/subjectivity.enum';
import { Endpoints } from '../src/common/api/endpoints';

jest.mock('Axios');
const mockedAxios = Axios as jest.Mocked<typeof Axios>;

describe('Client-side services', () => {
  test('Article submission', () => {
    const submitArticle: SubmitArticleService = container.get(SubmitArticleService);
    const expected: ERRAnalysisResponse = {
      agreement: Agreement.Disagreement,
      confidence: 86,
      irony: Irony.NonIronic,
      score_tag: ScoreTag.Negative,
      subjectivity: Subjectivity.Subjective,
      articleTitle: 'Cinema chief: Current purpose is simply survival',
      editor: 'Katriin Eikin Sein'
    };
    mockedAxios.post.mockResolvedValueOnce({ data: expected });
    const testUrl = 'https://news.err.ee/1119178/cinema-chief-current-purpose-is-simply-survival';
    return submitArticle.submitArticle(testUrl).then((result) => {
      expect(mockedAxios.post).toHaveBeenCalledWith(`${Endpoints.Prefix}${Endpoints.AnalyzeArticle}`, { url: testUrl });
      expect(result).toEqual(expected);
    });
  });
});
