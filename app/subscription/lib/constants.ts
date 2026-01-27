// 마크업 단계에서 디자인을 확인하기 위한 더미 데이터 및 상수들 포함

// 결제 방법 옵션
export const PAYMENT_OPTIONS = [
  { value: '신용카드', label: '신용카드' },
  { value: '가상계좌', label: '가상계좌' },
  { value: '무통장 입금', label: '무통장 입금' },
  { value: '핸드폰 결제', label: '핸드폰 결제' },
];

// 은행 선택 옵션
export const BANK_OPTIONS = [
  { value: 'KB국민은행', label: 'KB국민은행' },
  { value: '신한은행', label: '신한은행' },
  { value: '우리은행', label: '우리은행' },
  { value: '하나은행', label: '하나은행' },
  { value: 'NH농협은행', label: 'NH농협은행' },
];

// 초기 상품 데이터
export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: '그린몬스터 다이어트 스페셜 2 가르시니아 900 112정',
    price: 12700,
    quantity: 1,
    checked: true,
  },
  {
    id: 2,
    name: '루테인 지아잔틴 GR 4박스 4개월분 캡슐',
    price: 72000,
    quantity: 1,
    checked: true,
  },
];

// 배송비 기준
export const FREE_SHIPPING_THRESHOLD = 50000;
export const SHIPPING_FEE = 2500;

// 쿠폰 코드 및 할인율
export const COUPON_CODES = {
  WELCOME10: 0.1, // 10% 할인
};

// 초기 사용 가능 포인트
export const INITIAL_AVAILABLE_POINTS = 10000;
