import type { CategoryKey } from '@/app/survey/data/buildQuestion';

export type IntensityLabel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

//전체 payload 구조
export type SurveyResultPayload = {
  //기록 정렬
  createdAt: string;

  //기본 질문
  basicInfo: {
    gender: string;
    ageGroup: string;
  };
  //카테고리
  selectedCategories: CategoryKey[];

  //카테고리별 설문 결과
  categories: Record<
    CategoryKey,
    {
      //multiChoice 질문 선택 결과
      state: string[];

      // scaleChoice 결과
      intensity: IntensityLabel;
    }
  >;
};

// scaleChoice 숫자 값을 의미값으로 매핑
const INTENSITY_MAP: Record<number, IntensityLabel> = {
  1: 'very_low',
  2: 'low',
  3: 'medium',
  4: 'high',
  5: 'very_high',
};

function mapIntensity(value: unknown): IntensityLabel {
  const n = Number(value);
  return INTENSITY_MAP[n] ?? 'medium';
}

// 설문 answers를 결과 페이지용 payload로 변환

export function buildSurveyPayload(params: { answers: Record<string, unknown>; selectedCategories: CategoryKey[] }): SurveyResultPayload {
  const { answers, selectedCategories } = params;

  const basic = (answers['basic'] as { gender?: string; ageGroup?: string }) ?? {};

  const categories = {} as SurveyResultPayload['categories'];

  selectedCategories.forEach((key) => {
    categories[key] = {
      state: (answers[`${key}_state`] as string[]) ?? [],
      intensity: mapIntensity(answers[`${key}_intensity`]),
    };
  });

  return {
    createdAt: new Date().toISOString(),
    basicInfo: {
      gender: String(basic.gender ?? ''),
      ageGroup: String(basic.ageGroup ?? ''),
    },
    selectedCategories,
    categories,
  };
}
