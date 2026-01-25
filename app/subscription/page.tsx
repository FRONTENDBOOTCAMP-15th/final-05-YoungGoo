'use client';
import '@/app/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ItemList from './ItemList';

export default function Subscription() {
  const router = useRouter();
  
  // 상품 데이터 상태 관리 (디자인 확인용)
  const [products, setProducts] = useState([
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
  ]);

  // 쿠폰/포인트 상태
  const [coupon, setCoupon] = useState('');
  const [point, setPoint] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [pointUsed, setPointUsed] = useState(0);
  const [availablePoints] = useState(10000); // 사용 가능 포인트

  // 구매 동의 체크박스 상태
  const [agreed, setAgreed] = useState(false);

  // 주문자 정보 상태
  const [ordererInfo, setOrdererInfo] = useState({
    name: '홍길동',
    phone: '01012345678',
    email: 'user@gmail.com',
  });
  const [isEditingOrderer, setIsEditingOrderer] = useState(false);

  // 배송 정보 상태
  const [shippingInfo, setShippingInfo] = useState({
    name: '홍길동',
    phone: '01012345678',
    address1: '서울 종로구 종로3길17',
    address2: '광화문D타워 D1동 16층, 17층',
  });
  const [isEditingShipping, setIsEditingShipping] = useState(false);

  // 체크박스 토글
  const toggleCheck = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)));
  };

  // 수량 증가 버튼
  const increaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  };

  // 수량 감소 버튼
  const decreaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p)));
  };

  // 주문자 정보 저장
  const saveOrdererInfo = () => {
    if (!ordererInfo.name || !ordererInfo.phone || !ordererInfo.email) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    setIsEditingOrderer(false);
    alert('주문자 정보가 저장되었습니다.');
  };

  // 배송 정보 저장
  const saveShippingInfo = () => {
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address1) {
      alert('필수 정보를 입력해주세요.');
      return;
    }
    setIsEditingShipping(false);
    alert('배송 정보가 저장되었습니다.');
  };

  // 쿠폰 적용
  const applyCoupon = () => {
    // 예시: 쿠폰 코드에 따른 할인
    if (coupon === 'WELCOME10') {
      const discount = Math.floor(calculateProductTotal() * 0.1); // 10% 할인
      setCouponDiscount(discount);
      alert(`쿠폰이 적용되었습니다! ${discount.toLocaleString()}원 할인`);
    } else if (coupon === '') {
      alert('쿠폰 코드를 입력해주세요.');
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

  // 총 상품 가격 계산
  const calculateProductTotal = () => {
    return products.filter((p) => p.checked).reduce((sum, p) => sum + p.price * p.quantity, 0);
  };

  // 배송비 계산 (50,000원 이상 무료)
  const calculateShippingFee = () => {
    const total = calculateProductTotal();
    return total >= 50000 ? 0 : 2500;
  };

  // 최종 결제 금액 계산
  const calculateFinalTotal = () => {
    return calculateProductTotal() - couponDiscount - pointUsed + calculateShippingFee();
  };

  // 결제 방법 선택
  const selectPaymentMethod = (method: string) => {
    setPaymentMethod(method);
    // 드롭다운 닫기
    const dropdownContent = document.getElementById('dropdownContent');
    if (dropdownContent) {
      dropdownContent.classList.add('hidden');
    }
  };

  // 결제 방법 상태
  const [paymentMethod, setPaymentMethod] = useState('결제 방법 선택하기');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    accountBank: '',
    accountNumber: '',
    depositorName: '',
    phoneNumber: '',
  });

  // 결제하기
  const handlePayment = () => {
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    const selectedProducts = products.filter(p => p.checked);
    if (selectedProducts.length === 0) {
      alert('결제할 상품을 선택해주세요.');
      return;
    }

    if (paymentMethod === '결제 방법 선택하기') {
      alert('결제 방법을 선택해주세요.');
      return;
    }

    // 결제 정보를 sessionStorage에 저장
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

    // 결제 완료 페이지로 이동
    router.push('/subscription/complete');
  };

  // 결제 방법 선택
  useEffect(() => {
    const dropdownButton = document.getElementById('dropdownButton') as HTMLButtonElement;
    const dropdownContent = document.getElementById('dropdownContent') as HTMLElement;
    const bankDropdownButton = document.getElementById('bankDropdownButton') as HTMLButtonElement;
    const bankDropdownContent = document.getElementById('bankDropdownContent') as HTMLElement;

    if (!dropdownButton || !dropdownContent) return;

    // 드롭다운 버튼 클릭 이벤트 핸들러
    const handleButtonClick = () => {
      dropdownContent.classList.toggle('hidden');
      // 결제 방법 드롭다운 열 때 은행 드롭다운 닫기
      if (bankDropdownContent) {
        bankDropdownContent.classList.add('hidden');
      }
    };

    // 화면 어느 곳이든 클릭했을 때의 이벤트 핸들러
    const handleWindowClick = (e: MouseEvent) => {
      // 결제 방법 드롭다운 처리
      if (!dropdownButton.contains(e.target as HTMLElement) && !dropdownContent.contains(e.target as HTMLElement)) {
        dropdownContent.classList.add('hidden');
      }
      // 은행 드롭다운 처리
      if (bankDropdownButton && bankDropdownContent) {
        if (!bankDropdownButton.contains(e.target as HTMLElement) && !bankDropdownContent.contains(e.target as HTMLElement)) {
          bankDropdownContent.classList.add('hidden');
        }
      }
    };

    dropdownButton.addEventListener('click', handleButtonClick);
    window.addEventListener('click', handleWindowClick);

    // 클린업
    return () => {
      dropdownButton.removeEventListener('click', handleButtonClick);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-cover bg-fixed bg-yg-white overflow-x-hidden">
        <main>
          <div className="min-w-7xl mx-auto flex px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-80 py-5 gap-7.5">
            <div className="w-79/120 min-w-175 flex flex-col gap-6">
              {/* 1. 주문 상품 정보 */}
              <ItemList products={products} onToggleCheck={toggleCheck} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />

              {/* 2. 주문자 정보 */}
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary">
                <h1 className="text-xl font-bold">주문자 정보</h1>
                <br />
                {isEditingOrderer ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="orderer-name" className="font-bold text-yg-primary">
                        이름
                      </label>
                      <input id="orderer-name" type="text" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={ordererInfo.name} onChange={(e) => setOrdererInfo({ ...ordererInfo, name: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="orderer-phone" className="font-bold text-yg-primary">
                        전화번호
                      </label>
                      <input id="orderer-phone" type="tel" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={ordererInfo.phone} onChange={(e) => setOrdererInfo({ ...ordererInfo, phone: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="orderer-email" className="font-bold text-yg-primary">
                        이메일
                      </label>
                      <input id="orderer-email" type="email" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={ordererInfo.email} onChange={(e) => setOrdererInfo({ ...ordererInfo, email: e.target.value })} />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button className="bg-yg-gray px-4 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={() => setIsEditingOrderer(false)}>
                        취소
                      </button>
                      <button className="bg-yg-primary px-4 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={saveOrdererInfo}>
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg py-1">{ordererInfo.name}</p>
                      <p className="text-yg-darkgray">{ordererInfo.phone}</p>
                      <p className="text-yg-darkgray">{ordererInfo.email}</p>
                    </div>
                    <button className="bg-yg-primary px-2 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={() => setIsEditingOrderer(true)}>
                      수정
                    </button>
                  </div>
                )}
              </section>

              {/* 3. 배송 정보 */}
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary">
                <h1 className="text-xl font-bold">배송 정보</h1>
                <br />
                {isEditingShipping ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="shipping-name" className="font-bold text-yg-primary">
                        수령인
                      </label>
                      <input id="shipping-name" type="text" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="shipping-phone" className="font-bold text-yg-primary">
                        전화번호
                      </label>
                      <input id="shipping-phone" type="tel" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="shipping-address1" className="font-bold text-yg-primary">
                        주소
                      </label>
                      <input id="shipping-address1" type="text" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={shippingInfo.address1} onChange={(e) => setShippingInfo({ ...shippingInfo, address1: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="shipping-address2" className="font-bold text-yg-primary">
                        상세 주소
                      </label>
                      <input id="shipping-address2" type="text" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={shippingInfo.address2} onChange={(e) => setShippingInfo({ ...shippingInfo, address2: e.target.value })} />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button className="bg-yg-gray px-4 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={() => setIsEditingShipping(false)}>
                        취소
                      </button>
                      <button className="bg-yg-primary px-4 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={saveShippingInfo}>
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg py-1">{shippingInfo.name}</p>
                      <p className="text-yg-darkgray py-1">{shippingInfo.phone}</p>
                      <p className="text-lg">{shippingInfo.address1}</p>
                      <p className="text-lg">{shippingInfo.address2}</p>
                    </div>
                    <button className="bg-yg-primary px-2 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={() => setIsEditingShipping(true)}>
                      수정
                    </button>
                  </div>
                )}
              </section>

              {/* 4. 쿠폰/포인트 */}
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary">
                <h1 className="text-xl font-bold">쿠폰/포인트</h1>
                <br />
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-end gap-6">
                    <div className="flex flex-col w-full gap-2">
                      <label htmlFor="coupon" className="font-bold text-yg-primary">
                        쿠폰
                      </label>
                      <input id="coupon" className="coupon px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="쿠폰 코드 입력" />
                    </div>
                    <button className="bg-yg-primary px-2 w-27 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={applyCoupon}>
                      쿠폰 적용
                    </button>
                  </div>
                  <div className="flex justify-between items-end gap-6">
                    <div className="flex flex-col w-full gap-2">
                      <label htmlFor="point" className="font-bold text-yg-primary">
                        포인트 (보유: {availablePoints.toLocaleString()}P)
                      </label>
                      <input id="point" type="number" className="point px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={point} onChange={(e) => handlePointChange(e.target.value)} placeholder="포인트 입력" />
                    </div>
                    <button className="bg-yg-primary px-2 w-27 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg" onClick={useAllPoints}>
                      전액 사용
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <div className="w-38/120 min-w-82.5 flex flex-col gap-6">
              {/* 5. 총 결제 금액 */}
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary">
                <h1 className="text-xl font-bold">총 결제 금액</h1>
                <br />
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
              </section>

              {/* 6. 결제 방법 */}
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary">
                <h1 className="text-xl font-bold">결제 방법</h1>
                <br />
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <button
                      id="dropdownButton"
                      className="w-full bg-yg-white text-yg-primary shadow-lg px-4 py-2 font-semibold rounded-[50px] border border-yg-primary focus:outline-none"
                    >
                      {paymentMethod}
                    </button>
                    <div id="dropdownContent" className="hidden absolute w-full bg-white rounded shadow mt-2 z-10">
                      <button
                        onClick={() => selectPaymentMethod('신용카드')}
                        className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                      >
                        신용카드
                      </button>
                      <button
                        onClick={() => selectPaymentMethod('가상계좌')}
                        className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                      >
                        가상계좌
                      </button>
                      <button
                        onClick={() => selectPaymentMethod('무통장 입금')}
                        className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                      >
                        무통장 입금
                      </button>
                      <button
                        onClick={() => selectPaymentMethod('핸드폰 결제')}
                        className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                      >
                        핸드폰 결제
                      </button>
                    </div>
                  </div>

                  {/* 신용카드 입력 필드 */}
                  {paymentMethod === '신용카드' && (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        placeholder="카드 번호 (0000-0000-0000-0000)"
                        className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="유효기간 (MM/YY)"
                        className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                        value={paymentDetails.cardExpiry}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                        value={paymentDetails.cardCVC}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCVC: e.target.value })}
                        />
                    </div>
                  )}

                  {/* 가상계좌 입력 필드 */}
                  {paymentMethod === '가상계좌' && (
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <button
                          id="bankDropdownButton"
                          className="w-full bg-yg-white text-yg-primary shadow-lg px-4 py-2 font-semibold rounded-[50px] border border-yg-primary focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            const dropdown = document.getElementById('bankDropdownContent');
                            if (dropdown) {
                              dropdown.classList.toggle('hidden');
                            }
                          }}
                        >
                          {paymentDetails.accountBank || '은행 선택'}
                        </button>
                        <div id="bankDropdownContent" className="hidden absolute w-full bg-white rounded shadow mt-2 z-10">
                          <button
                            onClick={() => {
                              setPaymentDetails({ ...paymentDetails, accountBank: 'KB국민은행' });
                              document.getElementById('bankDropdownContent')?.classList.add('hidden');
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                          >
                            KB국민은행
                          </button>
                          <button
                            onClick={() => {
                              setPaymentDetails({ ...paymentDetails, accountBank: '신한은행' });
                              document.getElementById('bankDropdownContent')?.classList.add('hidden');
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                          >
                            신한은행
                          </button>
                          <button
                            onClick={() => {
                              setPaymentDetails({ ...paymentDetails, accountBank: '우리은행' });
                              document.getElementById('bankDropdownContent')?.classList.add('hidden');
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                          >
                            우리은행
                          </button>
                          <button
                            onClick={() => {
                              setPaymentDetails({ ...paymentDetails, accountBank: '하나은행' });
                              document.getElementById('bankDropdownContent')?.classList.add('hidden');
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                          >
                            하나은행
                          </button>
                          <button
                            onClick={() => {
                              setPaymentDetails({ ...paymentDetails, accountBank: 'NH농협은행' });
                              document.getElementById('bankDropdownContent')?.classList.add('hidden');
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-yg-lightgray"
                          >
                            NH농협은행
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="입금자명"
                        className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                        value={paymentDetails.depositorName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, depositorName: e.target.value })}
                      />
                      <p className="text-sm text-yg-darkgray px-5">* 가상계좌 번호는 주문 완료 후 발급됩니다.</p>
                    </div>
                  )}

                  {/* 무통장 입금 입력 필드 */}
                  {paymentMethod === '무통장 입금' && (
                    <div className="flex flex-col gap-3">
                      <div className="p-3 text-sm text-yg-primary">
                        <p className='font-semibold'>입금 계좌</p>
                        <p>KB국민은행 123-456-789012</p>
                        <p>예금주: (주)그린약국</p>
                      </div>
                      <input
                        type="text"
                        placeholder="입금자명"
                        className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                        value={paymentDetails.depositorName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, depositorName: e.target.value })}
                      />
                      <p className="px-3 text-sm text-yg-warning">주문 후 3일 이내 입금하지 않으면 자동 취소됩니다.</p>
                    </div>
                  )}

                  {/* 핸드폰 결제 입력 필드 */}
                  {paymentMethod === '핸드폰 결제' && (
                    <div className="flex flex-col gap-3">
                      <input
                        type="tel"
                        placeholder="휴대폰 번호 (010-0000-0000)"
                        className="px-5 py-2 shadow-lg rounded-[50px] border border-yg-primary"
                        value={paymentDetails.phoneNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, phoneNumber: e.target.value })}
                      />
                      <p className="px-3 text-sm text-yg-warning">결제 승인 SMS가 발송됩니다.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* 7. 구매 동의 */}
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary">
                <h1 className="text-xl font-bold">구매 동의</h1>
                <br />
                <div className="flex items-baseline gap-2">
                  <input type="checkbox" id="agreement" className="agreement" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                  <label htmlFor="agreement" className="mb-0">
                    [필수] 개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>
              </section>

              {/* 8. 결제하기 */}
              <button className="bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg" onClick={handlePayment}>
                결제하기
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}