import {SentimentAnalysisResponse} from './sentiment-analysis.response';

export function ERRAnalysisResponse(agreement, confidence, irony, score_tag, subjectivity, articleTitle, editor) {
  const sentimentAnalysisResponse = new SentimentAnalysisResponse(agreement, confidence, irony, score_tag, subjectivity);
  let errAnalysisResponse = {
    ...sentimentAnalysisResponse,
    articleTitle,
    editor
  };
  return errAnalysisResponse;
}
