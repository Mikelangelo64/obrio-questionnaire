export enum EScreenType {
  QUESTION = 'QUESTION',
  INFO = 'INFO',
}

export enum EQuestionType {
  OPTIONS = 'OPTIONS',
}

export type TScreenId = string;

export interface IOption {
  optionId: string;
  value: string;
  label: string;
}

export interface IAdditionalInfo {
  title: string;
  description?: string;
  buttonLabel?: string;
}

export interface INextScreenOptionConditionInfo {
  optionId: IOption['optionId'];
  nextScreenId: TScreenId;
}

export type TNextScreenOptionCondition =
  | INextScreenOptionConditionInfo[]
  | TScreenId;

export type TScreenBase = {
  screenId: TScreenId;
  screenType: EScreenType;
  title: string;
  description?: string;
  nextScreenInfoId?: TScreenId;
};

export type TScreenInfo = {
  screenType: EScreenType.INFO;
  dependsOn: TScreenId;
  buttonLabel?: string;
};

export type TQuestionBase = {
  screenType: EScreenType.QUESTION;
};

export type TQuestionOptions = {
  questionType: EQuestionType.OPTIONS;
  nextScreenConditions: TNextScreenOptionCondition;
  options: IOption[];
};

export type TQuestion = TQuestionBase & TQuestionOptions;

export type TScreen = TScreenBase & (TQuestion | TScreenInfo);
