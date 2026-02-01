// types/product.ts

export type Category = {
  id: string;
  name: string;
};

export type NutritionNutrient = {
  name: string;
  amount?: string;
  percent?: string;
};

export type NutritionInfoExample = {
  servingSize: string;
  nutrients: NutritionNutrient[];
};

export type SupplementItem = {
  _id: string;
  name: string;
  price: number;
  categoryId: string;

  /** 상품 요약 */
  summary: string;
  mainNutrients: string[];
  mainFunctions: string[];

  /** 섭취 정보 */
  intakeGuide: string;
  precautions: string[];
  storage: string;

  /** 영양 정보 */
  nutritionInfoExample?: NutritionInfoExample;

  /** 이미지 */
  imageUrl: string;
  tags?: string[];
};

export type SortType = 'popular' | 'priceLow' | 'priceHigh';
