/**
 * Not the whole response of the sentiment API.
 * Only the fields which are of interest to this app.
 */
export function SentimentAnalysisResponse(agreement, confidence, irony, score_tag, subjectivity) {
  this.agreement = agreement;
  this.confidence = confidence;
  this.irony = irony;
  this.score_tag = score_tag;
  this.subjectivity = subjectivity;
}
