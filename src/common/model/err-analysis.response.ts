import { SentimentAnalysisResponse } from './sentiment-analysis.response';

export interface ERRAnalysisResponse extends SentimentAnalysisResponse {
  articleTitle: string;
  editor: string;
}
