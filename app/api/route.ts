import MainQuestionData from '@/data/questionnaire.json';
import WithDateQuestionData from '@/data/date-questionnaire.json';
import { EQuestioannaireVariant } from '@/types/question.type';
import { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const questionnaireVariant = searchParams.get(
    'variant',
  ) as EQuestioannaireVariant | null;

  if (questionnaireVariant === EQuestioannaireVariant.WITH_DATE) {
    return Response.json(WithDateQuestionData);
  }

  return Response.json(MainQuestionData);
}
