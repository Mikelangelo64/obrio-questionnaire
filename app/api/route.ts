// import QuestionData from '@/data/questionnaire.json';
import QuestionData from '@/data/date-questionnaire.json';

export function GET() {
  return Response.json(QuestionData);
}
