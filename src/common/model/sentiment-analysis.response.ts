import { Agreement } from './enum/agreement.enum';
import { Irony } from './enum/irony.enum';
import { Subjectivity } from './enum/subjectivity.enum';
import { ScoreTag } from './enum/score-tag.enum';

/**
 * Not the whole response of the sentiment API.
 * Only the fields which are of interest to this app.
 */
export interface SentimentAnalysisResponse {
  agreement: Agreement;
  confidence: number;
  irony: Irony;
  score_tag: ScoreTag;
  subjectivity: Subjectivity;
}
