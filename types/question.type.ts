export enum EQuestioannaireVariant {
  MAIN = 'MAIN',
  WITH_DATE = 'WITH_DATE',
}

export enum EScreenType {
  QUESTION = 'QUESTION',
  INFO = 'INFO',
}

export enum EQuestionType {
  OPTIONS = 'OPTIONS',
  DATE = 'DATE',
}

export enum EExtremeStatus {
  START = 'START',
  END = 'END',
}

export enum EDateCondition {
  EARLIER = 'EARLIER',
  LATER = 'LATER',
  EARLIER_OR_TODAY = 'EARLIER_OR_TODAY',
  LATER_OR_TODAY = 'LATER_OR_TODAY',
  TODAY = 'TODAY',
}

export type TScreenId = string;

export interface IDynamicTextSegment {
  label: string;
  value: string;
}

export interface IOption {
  optionId: string;
  value: string;
  label: string;
  dynamicTextSegment?: IDynamicTextSegment;
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

export interface INextScreenDateConditionInfo {
  conditionalDateISO: string;
  condition: EDateCondition;
  nextScreenId: TScreenId;
}

export type TNextScreenOptionCondition =
  | INextScreenOptionConditionInfo[]
  | TScreenId;

export type TNextScreenDateCondition =
  | INextScreenDateConditionInfo[]
  | TScreenId;

export type TScreenBase = {
  screenId: TScreenId;
  screenType: EScreenType;
  title: string;
  description?: string;
  nextInfoScreenId?: TScreenId;
  extremeStatus?: EExtremeStatus;
};

export type TInfoScreen = {
  screenType: EScreenType.INFO;
  buttonLabel?: string;
};

export type TQuestionBase = {
  screenType: EScreenType.QUESTION;
};

export type TQuestionOptions = {
  questionType: EQuestionType.OPTIONS;
  nextScreenConditions?: TNextScreenOptionCondition;
  options: IOption[];
};

export type TQuestionDate = {
  questionType: EQuestionType.DATE;
  nextScreenConditions?: TNextScreenDateCondition;
  buttonLabel?: string;
};

export type TQuestion = TQuestionBase & (TQuestionOptions | TQuestionDate);

export type TScreen = TScreenBase & (TQuestion | TInfoScreen);
