import QuestionData from '@/lib/data/questionnaire.json';

export function GET() {
  return Response.json(QuestionData);
}
