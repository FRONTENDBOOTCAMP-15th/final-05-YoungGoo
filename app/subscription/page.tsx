'use client';
import '@/app/globals.css';
import ItemList from '@/components/subscription/ItemList';
import SectionCard from '@/components/subscription/SectionCard';
import Dropdown from '@/components/subscription/Dropdown';
import EditableInfoSection from '@/components/subscription/EditableInfoSection';
import CouponPointSection from '@/components/subscription/CouponPointSection';
import PaymentMethodFields from '@/components/subscription/PaymentMethodFields';
import { useSubscription } from './lib/useSubscription';
import { PAYMENT_OPTIONS } from './lib/constants';

export default function Subscription() {
  const {
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
  } = useSubscription();

  return (
    <>
      <div className="w-full h-screen bg-cover bg-fixed bg-white my-8 overflow-x-hidden">
        <main>
          <div className="min-w-6xl mx-auto flex lg:px-40 2xl:px-80 py-5 gap-7.5">
            {/* 왼쪽 영역 */}
            <section className="w-79/120 min-w-175 flex flex-col gap-6">
              {/* 1. 주문 상품 정보 */}
              <SectionCard title="주문 상품 목록">
                <ItemList
                  products={products}
                  onToggleCheck={toggleCheck}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                />
              </SectionCard>

              {/* 2. 주문자 정보 */}
              <EditableInfoSection
                title="주문자 정보"
                type="orderer"
                data={ordererInfo}
                onSave={(data) => setOrdererInfo(data as typeof ordererInfo)}
              />

              {/* 3. 배송 정보 */}
              <EditableInfoSection
                title="배송 정보"
                type="shipping"
                data={shippingInfo}
                onSave={(data) => setShippingInfo(data as typeof shippingInfo)}
              />

              {/* 4. 쿠폰/포인트 */}
              <CouponPointSection
                coupon={coupon}
                point={point}
                availablePoints={availablePoints}
                onCouponChange={setCoupon}
                onPointChange={handlePointChange}
                onApplyCoupon={applyCoupon}
                onUseAllPoints={useAllPoints}
              />
            </section>

            {/* 오른쪽 영역 */}
            <section className="w-38/120 min-w-82.5 flex flex-col gap-6">
              {/* 5. 총 결제 금액 */}
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
                    <p className="text-lg font-bold text-yg-primary whitespace-nowrap">
                      {calculateFinalTotal().toLocaleString()}원
                    </p>
                  </li>
                </ul>
              </SectionCard>

              {/* 6. 결제 방법 */}
              <SectionCard title="결제 방법">
                <div className="flex flex-col gap-4">
                  <Dropdown
                    options={PAYMENT_OPTIONS}
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    placeholder="결제 방법 선택하기"
                  />
                  <PaymentMethodFields
                    paymentMethod={paymentMethod}
                    paymentDetails={paymentDetails}
                    onPaymentDetailsChange={setPaymentDetails}
                  />
                </div>
              </SectionCard>

              {/* 7. 구매 동의 */}
              <SectionCard title="구매 동의">
                <div className="flex items-baseline gap-2">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="agreement" className="mb-0">
                    [필수] 개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>
              </SectionCard>

              {/* 8. 결제하기 */}
              <button
                className="bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
                onClick={handlePayment}
              >
                결제하기
              </button>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}