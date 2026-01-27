import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  INITIAL_PRODUCTS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  COUPON_CODES,
  INITIAL_AVAILABLE_POINTS,
} from './constants';

export function useSubscription() {
  const router = useRouter();

  // 상품 데이터 상태
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // 쿠폰/포인트 상태
  const [coupon, setCoupon] = useState('');
  const [point, setPoint] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [pointUsed, setPointUsed] = useState(0);
  const [availablePoints] = useState(INITIAL_AVAILABLE_POINTS);

  // 구매 동의 체크박스 상태
  const [agreed, setAgreed] = useState(false);

  // 주문자 정보 상태
  const [ordererInfo, setOrdererInfo] = useState({
    name: '홍길동',
    phone: '01012345678',
    email: 'user@gmail.com',
  });

  // 배송 정보 상태
  const [shippingInfo, setShippingInfo] = useState({
    name: '홍길동',
    phone: '01012345678',
    address1: '서울 종로구 종로3길17',
    address2: '광화문D타워 D1동 16층, 17층',
  });

  // 결제 방법 상태
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    accountBank: '',
    depositorName: '',
    phoneNumber: '',
  });

  // 상품 관리 함수
  const toggleCheck = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)));
  };

  const increaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  };

  const decreaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p)));
  };

  // 계산 함수
  const calculateProductTotal = () => {
    return products.filter((p) => p.checked).reduce((sum, p) => sum + p.price * p.quantity, 0);
  };

  const calculateShippingFee = () => {
    const total = calculateProductTotal();
    return total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  };

  const calculateFinalTotal = () => {
    return calculateProductTotal() - couponDiscount - pointUsed + calculateShippingFee();
  };

  // 쿠폰 적용
  const applyCoupon = () => {
    if (coupon === '') {
      alert('쿠폰 코드를 입력해주세요.');
      return;
    }

    const discountRate = COUPON_CODES[coupon as keyof typeof COUPON_CODES];
    if (discountRate) {
      const discount = Math.floor(calculateProductTotal() * discountRate);
      setCouponDiscount(discount);
      alert(`쿠폰이 적용되었습니다! ${discount.toLocaleString()}원 할인`);
    } else {
      alert('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  // 포인트 전액 사용
  const useAllPoints = () => {
    const productTotal = calculateProductTotal() - couponDiscount;
    const maxUsablePoints = Math.min(availablePoints, productTotal);
    setPointUsed(maxUsablePoints);
    setPoint(maxUsablePoints.toString());
    alert(`${maxUsablePoints.toLocaleString()}원 포인트가 적용되었습니다!`);
  };

  // 포인트 입력 처리
  const handlePointChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    const productTotal = calculateProductTotal() - couponDiscount;

    if (numValue > availablePoints) {
      alert('보유 포인트를 초과할 수 없습니다.');
      return;
    }
    if (numValue > productTotal) {
      alert('상품 금액을 초과할 수 없습니다.');
      return;
    }

    setPoint(value);
    setPointUsed(numValue);
  };

  // 결제하기
  const handlePayment = () => {
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    const selectedProducts = products.filter((p) => p.checked);
    if (selectedProducts.length === 0) {
      alert('결제할 상품을 선택해주세요.');
      return;
    }

    if (!paymentMethod) {
      alert('결제 방법을 선택해주세요.');
      return;
    }

    const paymentInfo = {
      products: selectedProducts,
      totalAmount: calculateFinalTotal(),
      paymentMethod: paymentMethod,
      ordererInfo: ordererInfo,
      shippingInfo: shippingInfo,
      couponDiscount: couponDiscount,
      pointUsed: pointUsed,
      shippingFee: calculateShippingFee(),
    };

    sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
    router.push('/subscription/complete');
  };

  return {
    // 상태
    products,
    coupon,
    setCoupon,
    point,
    couponDiscount,
    pointUsed,
    availablePoints,
    agreed,
    setAgreed,
    ordererInfo,
    setOrdererInfo,
    shippingInfo,
    setShippingInfo,
    paymentMethod,
    setPaymentMethod,
    paymentDetails,
    setPaymentDetails,

    // 함수
    toggleCheck,
    increaseQuantity,
    decreaseQuantity,
    calculateProductTotal,
    calculateShippingFee,
    calculateFinalTotal,
    applyCoupon,
    useAllPoints,
    handlePointChange,
    handlePayment,
  };
}
