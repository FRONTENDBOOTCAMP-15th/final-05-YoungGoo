'use client';
import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfo {
  nickname: string;
  userId: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
}

interface SubscriptionInfo {
  isSubscribed: boolean;
  productName: string;
  dosage: string;
  paymentDate: string;
  nextPaymentDate: string;
}

export default function MyPage() {
  const router = useRouter();

  // 사용자 정보 상태 (디자인 확인용)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '홍길동',
    userId: 'user123',
    age: 30,
    gender: '남성',
    height: 175,
    weight: 70,
  });

  // 구독 정보 상태 (디자인 확인용)
  const [subscriptionInfo] = useState<SubscriptionInfo>({
    isSubscribed: true,
    productName: '그린몬스터 다이어트 스페셜 2',
    dosage: '900mg 112정',
    paymentDate: '2026.01.15',
    nextPaymentDate: '2026.02.15',
  });

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);

  // 로그아웃 모달 상태
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 회원탈퇴 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // 탭 상태
  const [activeTab, setActiveTab] = useState<'info' | 'subscription' | 'survey'>('info');

  // 사용자 정보 수정 저장
  const handleSaveUserInfo = () => {
    setIsEditing(false);
    alert('회원정보가 수정되었습니다.');
  };

  // 로그아웃
  const handleLogout = () => {
    setShowLogoutModal(false);
    alert('로그아웃되었습니다.');
    router.push('/');
  };

  // 회원탈퇴
  const handleDeleteAccount = () => {
    if (deleteConfirmText === '회원탈퇴') {
      setShowDeleteModal(false);
      alert('회원탈퇴가 완료되었습니다.');
      // 기능 구현 단계에서 수정 예정
      router.push('/');
    } else {
      alert('입력한 문구가 일치하지 않습니다.');
    }
  };

  // 설문 정보 페이지로 이동, 기능 구현 단계에서 수정 예정
  const handleGoToSurvey = () => {
    router.push('/survey/result');
  };

  return (
    <div className="w-full min-h-screen bg-yg-white overflow-x-hidden">
      <main>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row px-4 py-10 gap-6">
          {/* 왼쪽: 프로필 카드 */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary bg-yg-white">
              <div className="flex flex-col items-center mb-6">
                {/* 프로필 이미지 (추후 삭제될 수 있음) */}
                <div className="w-24 h-24 bg-yg-secondary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-yg-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{userInfo.nickname}</h2>
                <p className="text-yg-darkgray">@{userInfo.userId}</p>
              </div>

              {/* 로그아웃 / 회원탈퇴 버튼 */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition"
                >
                  로그아웃
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full bg-yg-secondary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition"
                >
                  회원탈퇴
                </button>
              </div>
            </section>
          </div>

          {/* 오른쪽: 탭 컨텐츠 */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* 탭 메뉴 */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-3 rounded-[50px] font-semibold shadow-lg transition ${
                  activeTab === 'info'
                    ? 'bg-yg-primary text-yg-white'
                    : 'bg-yg-white text-yg-primary border border-yg-primary'
                }`}
              >
                사용자 정보
              </button>
              <button
                onClick={() => setActiveTab('subscription')}
                className={`flex-1 py-3 rounded-[50px] font-semibold shadow-lg transition ${
                  activeTab === 'subscription'
                    ? 'bg-yg-primary text-yg-white'
                    : 'bg-yg-white text-yg-primary border border-yg-primary'
                }`}
              >
                구독 상태
              </button>
              <button
                onClick={() => setActiveTab('survey')}
                className={`flex-1 py-3 rounded-[50px] font-semibold shadow-lg transition ${
                  activeTab === 'survey'
                    ? 'bg-yg-primary text-yg-white'
                    : 'bg-yg-white text-yg-primary border border-yg-primary'
                }`}
              >
                설문 정보
              </button>
            </div>

            {/* 사용자 정보 탭 */}
            {activeTab === 'info' && (
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary bg-yg-white">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-lg font-semibold">사용자 정보</h1>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-yg-primary px-6 py-2 rounded-[50px] font-semibold text-yg-white shadow-lg"
                    >
                      수정
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-yg-primary font-semibold">닉네임</label>
                      <input
                        type="text"
                        className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                        value={userInfo.nickname}
                        onChange={(e) => setUserInfo({ ...userInfo, nickname: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-yg-primary font-semibold">아이디</label>
                      <input
                        type="text"
                        className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary bg-yg-lightgray"
                        value={userInfo.userId}
                        disabled
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 flex-1">
                        <label className="text-yg-primary font-semibold">연령</label>
                        <input
                          type="number"
                          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                          value={userInfo.age}
                          onChange={(e) => setUserInfo({ ...userInfo, age: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <label className="text-yg-primary font-semibold">성별</label>
                        <select
                          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                          value={userInfo.gender}
                          onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                        >
                          <option value="남성">남성</option>
                          <option value="여성">여성</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 flex-1">
                        <label className="text-yg-primary font-semibold">키 (cm)</label>
                        <input
                          type="number"
                          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                          value={userInfo.height}
                          onChange={(e) => setUserInfo({ ...userInfo, height: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <label className="text-yg-primary font-semibold">몸무게 (kg)</label>
                        <input
                          type="number"
                          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                          value={userInfo.weight}
                          onChange={(e) => setUserInfo({ ...userInfo, weight: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-yg-gray rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleSaveUserInfo}
                        className="flex-1 bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
                      >
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-yg-lightgray">
                      <span className="text-yg-darkgray">닉네임</span>
                      <span className="font-semibold">{userInfo.nickname}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-yg-lightgray">
                      <span className="text-yg-darkgray">아이디</span>
                      <span className="font-semibold">{userInfo.userId}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-yg-lightgray">
                      <span className="text-yg-darkgray">연령</span>
                      <span className="font-semibold">{userInfo.age}세</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-yg-lightgray">
                      <span className="text-yg-darkgray">성별</span>
                      <span className="font-semibold">{userInfo.gender}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-yg-lightgray">
                      <span className="text-yg-darkgray">키</span>
                      <span className="font-semibold">{userInfo.height}cm</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-yg-darkgray">몸무게</span>
                      <span className="font-semibold">{userInfo.weight}kg</span>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* 구독 상태 탭 */}
            {activeTab === 'subscription' && (
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary bg-yg-white">
                {subscriptionInfo.isSubscribed ? (
                  <div className="space-y-4">
                    <div className="bg-yg-white rounded-[50px]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">현재 구독 중</h3>
                        <span className="bg-yg-primary text-yg-white px-4 py-1 rounded-full text-sm font-semibold">
                          활성
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-yg-darkgray">상품명</span>
                          <span className="font-semibold">{subscriptionInfo.productName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yg-darkgray">용량</span>
                          <span className="font-semibold">{subscriptionInfo.dosage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yg-darkgray">결제일</span>
                          <span className="font-semibold">{subscriptionInfo.paymentDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yg-darkgray">다음 결제일</span>
                          <span className="font-semibold text-yg-primary">{subscriptionInfo.nextPaymentDate}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-yg-secondary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition">
                      구독 관리
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-yg-darkgray mb-6">현재 구독 중인 상품이 없습니다.</p>
                    <button
                      onClick={() => router.push('/subscription')}
                      className="bg-yg-primary rounded-[50px] text-yg-white font-semibold px-8 py-3 shadow-lg hover:bg-opacity-90 transition"
                    >
                      구독하러 가기
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* 설문 정보 탭 */}
            {activeTab === 'survey' && (
              <section className="p-10 shadow-lg rounded-[50px] border border-yg-primary bg-yg-white">
                <h1 className="text-lg font-semibold mb-6">설문 정보</h1>
                <div className="space-y-4">
                  {/* 설문 내역 카드들 */}
                  <div className="border border-yg-primary rounded-[30px] p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">건강 설문 #3</h3>
                        <p className="text-yg-darkgray text-sm">2026.01.15</p>
                      </div>
                      <button
                        onClick={handleGoToSurvey}
                        className="bg-yg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                      >
                        <svg className="w-5 h-5 text-yg-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="border border-yg-primary rounded-[30px] p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">건강 설문 #2</h3>
                        <p className="text-yg-darkgray text-sm">2025.01.10</p>
                      </div>
                      <button
                        onClick={handleGoToSurvey}
                        className="bg-yg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                      >
                        <svg className="w-5 h-5 text-yg-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="border border-yg-primary rounded-[30px] p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">건강 설문 #1</h3>
                        <p className="text-yg-darkgray text-sm">2024.01.05</p>
                      </div>
                      <button
                        onClick={handleGoToSurvey}
                        className="bg-yg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                      >
                        <svg className="w-5 h-5 text-yg-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* 로그아웃 모달 */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4">
          <div className="bg-yg-white rounded-[50px] p-10 max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">로그아웃</h2>
            <p className="text-center text-yg-darkgray mb-8">로그아웃하시겠습니까?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-yg-gray rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4">
          <div className="bg-yg-white rounded-[50px] p-10 max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold text-center text-yg-secondary">회원탈퇴</h2>
            <div className="bg-yg-secondary rounded-[50px] shadow-lg px-10 py-6 my-6">
              <h3 className="font-semibold mb-3 text-yg-white">⚠️ 주의사항</h3>
              <ul className="space-y-2 text-sm text-yg-white">
                <li>• 모든 개인정보가 영구적으로 삭제됩니다.</li>
                <li>• 구독 중인 서비스가 모두 해지됩니다.</li>
                <li>• 작성한 설문 내역이 삭제됩니다.</li>
                <li>• 탈퇴 후 복구가 불가능합니다.</li>
              </ul>
            </div>
            <p className="text-center text-sm mb-4">
              탈퇴를 진행하려면 아래에 <span className="font-semibold text-yg-secondary">{'회원탈퇴'}</span>를 입력하세요.
            </p>
            <input
              type="text"
              className="w-full px-5 py-3 shadow-lg rounded-[50px] border border-yg-secondary mb-6"
              placeholder="회원탈퇴"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 bg-yg-gray rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
              >
                취소
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-yg-secondary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}