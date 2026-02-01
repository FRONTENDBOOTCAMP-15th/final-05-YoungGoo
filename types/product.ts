// types/product.ts

/* ==============================
 * 카테고리
 * ============================== */
export type Category = {
  id: string;
  name: string;
};

/* ==============================
 * 영양 성분
 * ============================== */
export type NutritionNutrient = {
  name: string;
  amount: string;
  dailyValue: string;
};

export type NutritionInfoExample = {
  servingSize: string;
  nutrients: NutritionNutrient[];
};

/* ==============================
 * 상품 (서버 기준)
 * ============================== */
export type SupplementItem = {
  _id: number;

  createdAt: string;
  updatedAt: string;

  mainId: string;
  categoryId: string;

  name: string;
  content: string;

  mainNutrients: string[];
  mainFunctions: string[];

  intakeGuide: string;
  precautions: string[];
  storage: string;

  nutritionInfoExample?: NutritionInfoExample;

  price: number;
  quantity: number;

  show: boolean;
  active: boolean;

  replies: number;
  bookmarks: number;
  likes: number;
  options: number;
};

/* ==============================
 * 정렬 타입
 * ============================== */
export type SortType = 'popular' | 'priceLow' | 'priceHigh';
