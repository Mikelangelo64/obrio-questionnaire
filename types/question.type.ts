export enum EScreenType {
  QUESTION = 'QUESTION',
  INFO = 'INFO',
}

export enum EQuestionType {
  OPTIONS = 'OPTIONS',
}

export enum EExtremeStatus {
  START = 'START',
  END = 'END',
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

export type TNextScreenOptionCondition =
  | INextScreenOptionConditionInfo[]
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

export type TQuestion = TQuestionBase & TQuestionOptions;

export type TScreen = TScreenBase & (TQuestion | TInfoScreen);
