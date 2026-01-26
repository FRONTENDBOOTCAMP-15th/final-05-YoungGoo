type Option = { id: string; label: string };

export type QuestionData =
  | {
      id: string;
      uiType: 'basicInfo';
      title?: string;
      description?: string;
    }
  | {
      id: string;
      uiType: 'categorySelect';
      title: string;
      description?: string;
      options: Option[];
      maxSelect: number;
    }
  | {
      id: string;
      uiType: 'multiChoice';
      title: string;
      description?: string;
      options: Option[];
      maxSelect?: number;
    }
  | {
      id: string;
      uiType: 'scaleChoice';
      title: string;
      description?: string;
      /** 5개 선택지  */
      scaleChoices?: [string, string, string, string, string];
    };

export const QUESTIONS: QuestionData[] = [
  {
    id: 'basic',
    uiType: 'basicInfo',
    title: '기본 정보를 알려주세요',
    description: '성별과 연령대를 선택해 주세요.',
  },
  {
    id: 'category',
    uiType: 'categorySelect',
    title: '관심 있는 카테고리를 선택해 주세요',
    maxSelect: 2,
    options: [
      // 추후 카테고리 10개로 추가 예정
      { id: 'diet', label: '다이어트' },
      { id: 'eye', label: '눈 건강' },
      { id: 'gut', label: '장 건강' },
      { id: 'immune', label: '면역·피로' },
    ],
  },
  {
    id: 'diet_stress',
    uiType: 'scaleChoice',
    title: '요즘 체형이나 체중 문제로 스트레스를 얼마나 받고 계세요?',
    scaleChoices: ['거의 신경 안 써요', '가끔 생각나요', '조금 신경 쓰여요', '자주 스트레스 받아요', '하루 종일 고민이에요'],
  },
];
