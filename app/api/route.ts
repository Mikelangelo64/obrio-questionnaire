import QuestionData from '@/data/questionnaire.json';

export function GET() {
  return Response.json(QuestionData);
}
