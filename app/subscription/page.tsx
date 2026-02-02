'use client';
import '@/app/globals.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as PortOne from '@portone/browser-sdk/v2';
import ItemList from '@/components/subscription/ItemList';
import SectionCard from '@/components/subscription/SectionCard';
import Dropdown from '@/components/subscription/Dropdown';
import EditableInfoSection from '@/components/subscription/EditableInfoSection';
import CouponPointSection from '@/components/subscription/CouponPointSection';
import { PAYMENT_OPTIONS, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/subscription/constants';
import type { RecommendedProduct, SubscriptionProduct, OrdererInfo, ShippingInfo, PaymentMethod } from '@/types/subscription';

const DEFAULT_PRODUCTS: SubscriptionProduct[] = [
  { id: 1, name: '기본 상품', price: 100, quantity: 1, checked: true },
];

export default function Subscription() {
  const router = useRouter();
  const hasLoadedRef = useRef(false);

  const [products, setProducts] = useState<SubscriptionProduct[]>(DEFAULT_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [point, setPoint] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [pointUsed, setPointUsed] = useState(0);
  const [availablePoints] = useState(10000);
  const [agreed, setAgreed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
  const [ordererInfo, setOrdererInfo] = useState<OrdererInfo>({ name: '홍길동', phone: '01012345678', email: 'user@gmail.com' });
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({ name: '홍길동', phone: '01012345678', address1: '서울 종로구 종로3길17', address2: '광화문D타워 D1동 16층, 17층' });

  useEffect(() => {
    // Strict Mode로 인한 중복 실행 방지
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    loadRecommendedProducts();
  }, []);

  const loadRecommendedProducts = () => {
    setIsLoadingProducts(true);

    try {
      const savedProducts = sessionStorage.getItem('recommendedProducts');
      
      if (!savedProducts) {
        setProducts(DEFAULT_PRODUCTS);
        return;
      }

      const recommendedProducts = JSON.parse(savedProducts) as RecommendedProduct[];

      const subscriptionProducts: SubscriptionProduct[] = recommendedProducts.map((product, index) => ({
        id: index + 1,
        name: product.name,
        price: product.price,
        quantity: 1,
        checked: true,
      }));

      setProducts(subscriptionProducts);
      sessionStorage.removeItem('recommendedProducts');
    } catch (error) {
      console.error('추천 상품 로드 오류:', error);
      setProducts(DEFAULT_PRODUCTS);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const toggleCheck = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)));
  };

  const increaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  };

  const decreaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p)));
  };

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

  const applyCoupon = () => {
    if (coupon === '') {
      alert('쿠폰 코드를 입력해주세요.');
      return;
    }

    if (coupon === 'WELCOME10') {
      const discount = Math.floor(calculateProductTotal() * 0.1);
      setCouponDiscount(discount);
      alert(`쿠폰이 적용되었습니다! ${discount.toLocaleString()}원 할인`);
    } else {
      alert('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  const useAllPoints = () => {
    const productTotal = calculateProductTotal() - couponDiscount;
    const maxUsablePoints = Math.min(availablePoints, productTotal);
    setPointUsed(maxUsablePoints);
    setPoint(maxUsablePoints.toString());
    alert(`${maxUsablePoints.toLocaleString()}원 포인트가 적용되었습니다!`);
  };

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

  const handlePayment = async () => {
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

    const orderName = selectedProducts.length === 1 ? selectedProducts[0].name : `${selectedProducts[0].name} 외 ${selectedProducts.length - 1}건`;

    try {
      const baseParams = {
        storeId: 'store-e4038486-8d83-41a5-acf1-844a009e0d94',
        channelKey: 'channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5',
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: orderName,
        totalAmount: calculateFinalTotal(),
        currency: 'CURRENCY_KRW' as const,
        payMethod: paymentMethod as 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER',
        customer: {
          customerId: ordererInfo.email,
          fullName: ordererInfo.name,
          phoneNumber: ordererInfo.phone,
          email: ordererInfo.email,
        },
      };

      const paymentParams = paymentMethod === 'VIRTUAL_ACCOUNT' ? { ...baseParams, virtualAccount: { accountExpiry: { validHours: 48 }, cashReceiptType: 'PERSONAL' as const, customerIdentifier: ordererInfo.phone } } : baseParams;

      const response = await PortOne.requestPayment(paymentParams);

      if (!response) {
        alert('결제 응답을 받지 못했습니다. 다시 시도해주세요.');
        return;
      }

      if (response.code !== undefined) {
        alert(`결제 실패: ${response.message}`);
        return;
      }

      sessionStorage.setItem('paymentInfo', JSON.stringify({ paymentId: response.paymentId, products: selectedProducts, totalAmount: calculateFinalTotal(), paymentMethod: paymentMethod, ordererInfo: ordererInfo, shippingInfo: shippingInfo, couponDiscount: couponDiscount, pointUsed: pointUsed, shippingFee: calculateShippingFee() }));

      router.push('/subscription/complete');
    } catch (error) {
      console.error('결제 오류:', error);
      alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoadingProducts) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yg-primary mb-4"></div>
          <p className="text-lg text-yg-darkgray">추천 상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-cover bg-fixed bg-white my-8 overflow-x-hidden">
      <main>
        <div className="min-w-6xl mx-auto flex lg:px-40 2xl:px-80 py-5 gap-7.5">
          <section className="w-79/120 min-w-175 flex flex-col gap-6">
            <SectionCard title="주문 상품 목록">
              <ItemList products={products} onToggleCheck={toggleCheck} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
            </SectionCard>

            <EditableInfoSection title="주문자 정보" type="orderer" data={ordererInfo} onSave={(data) => setOrdererInfo(data as typeof ordererInfo)} />

            <EditableInfoSection title="배송 정보" type="shipping" data={shippingInfo} onSave={(data) => setShippingInfo(data as typeof shippingInfo)} />

            <CouponPointSection coupon={coupon} point={point} availablePoints={availablePoints} onCouponChange={setCoupon} onPointChange={handlePointChange} onApplyCoupon={applyCoupon} onUseAllPoints={useAllPoints} />
          </section>

          <section className="w-38/120 min-w-82.5 flex flex-col gap-6">
            <SectionCard title="총 결제 금액">
              <ul>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">상품 가격</p>
                  <p className="whitespace-nowrap">{calculateProductTotal().toLocaleString()}원</p>
                </li>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">쿠폰 할인</p>
                  <p className="whitespace-nowrap">−{couponDiscount.toLocaleString()}원</p>
                </li>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">포인트 사용</p>
                  <p className="whitespace-nowrap">−{pointUsed.toLocaleString()}원</p>
                </li>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">배송비</p>
                  <p className="whitespace-nowrap">+{calculateShippingFee().toLocaleString()}원</p>
                </li>
                <br />
                <li className="flex justify-between">
                  <p className="text-lg whitespace-nowrap">총 결제 금액</p>
                  <p className="text-lg font-bold text-yg-primary whitespace-nowrap">{calculateFinalTotal().toLocaleString()}원</p>
                </li>
              </ul>
            </SectionCard>

            <SectionCard title="결제 방법">
              <div className="flex flex-col gap-4">
                <Dropdown options={PAYMENT_OPTIONS} value={paymentMethod} onChange={(value) => setPaymentMethod(value as typeof paymentMethod)} placeholder="결제 방법 선택하기" />
              </div>
            </SectionCard>

            <SectionCard title="구매 동의">
              <div className="flex items-baseline gap-2">
                <input type="checkbox" id="agreement" className="agreement" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <label htmlFor="agreement" className="mb-0">[필수] 개인정보 수집 및 이용에 동의합니다.</label>
              </div>
            </SectionCard>

            <button className="bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition" onClick={handlePayment}>결제하기</button>
          </section>
        </div>
      </main>
    </div>
  );
}