// 카테고리
export type Category = {
  id: string;
  name: string;
};

// 영양소 (※ required로 통일)
export type NutritionNutrient = {
  name: string;
  amount: string;
  percent: string;
};

// 영양정보 박스
export type NutritionInfoExample = {
  servingSize: string;
  nutrients: NutritionNutrient[];
};

// 상품 (리스트/상세 공용)
export type SupplementItem = {
  _id: string;
  name: string;
  summary: string;
  price: number;

  categoryId: string;

  mainNutrients: string[];
  mainFunctions: string[];

  intakeGuide: string;
  precautions: string[];
  storage: string;

  nutritionInfoExample?: NutritionInfoExample;

  imageUrl?: string;
  tags?: string[];

  createdAt?: string;
  updatedAt?: string;

  show?: boolean;
  active?: boolean;
};

// 정렬
export type SortType = 'popular' | 'priceLow' | 'priceHigh';
