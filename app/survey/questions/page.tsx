'use client';

import { useState } from 'react';

import SurveyShell from '@/app/survey/components/SurveyShell';
import ProgressBar from '@/app/survey/components/ProgressBar';
import Question from '@/app/survey/components/Question';
import QuestionRenderer from '@/app/survey/components/QuestionRenderer';
import BottomNav from '@/app/survey/components/Nav';

import { QUESTIONS } from '@/app/survey/data/Questions';
import PillIcon from '@/app/survey/components/icons/pill';

type AnswerMap = Record<string, unknown>;
export default function SurveyQuestionsPage() {
  // 몇 번째 질문인지
  const [step, setStep] = useState(0);

  // 질문 id를 key로 전체 설문 답변을 저장
  const [answers, setAnswers] = useState<AnswerMap>({});

  // 전체 질문 개수
  const total = QUESTIONS.length;

  // 현재 step에 해당하는 질문 데이터
  const q = QUESTIONS[step];

  // 질문 데이터가 없을 경우
  if (!q) {
    return (
      <SurveyShell title="설문 페이지">
        <div className="py-16 text-center text-sm text-[var(--color-yg-darkgray)]">질문을 불러오지 못했어요. 다시 시도해주세요.</div>
      </SurveyShell>
    );
  }

  // 현재 질문의 답변 값
  const answer = answers[q.id];

  // 진행률 계산 (퍼센트)
  const progress = Math.round(((step + 1) / total) * 100);

  // 질문 답변 변경 시 호출
  const handleChange = (next: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: next,
    }));
  };

  // 이전 질문으로 이동
  const goPrev = () => setStep((s) => Math.max(0, s - 1));

  // 다음 질문으로 이동
  const goNext = () => setStep((s) => Math.min(total - 1, s + 1));

  // 하단 버튼 클릭 처리
  const handlePrimary = () => {
    if (step === total - 1) {
      console.log('SUBMIT answers:', answers);
      return;
    }

    goNext();
  };

  // 질문 유형에 따른 상단 배지
  const badge = q.uiType === 'basicInfo' ? '설문 시작' : q.uiType === 'categorySelect' ? '카테고리 선택' : q.uiType === 'multiChoice' ? '선택 질문' : '강도 질문';

  return (
    <SurveyShell title="설문 페이지">
      <div className="flex flex-col gap-4">
        {/* 진행 바 */}
        <ProgressBar value={progress} />

        {/* 질문 영역 (배지 / 제목 / 설명 / 아이콘) */}
        <Question badge={badge} title={q.title ?? '질문'} description={q.description} icon={<PillIcon className="h-12 w-12" />} />

        {/* 질문 유형에 따라 실제 입력 UI 렌더링 */}
        <QuestionRenderer question={q} value={answer} onChange={handleChange} />

        {/* 하단 네비게이션 (이전 / 다음 / 제출) */}
        <BottomNav secondaryLabel={step === 0 ? undefined : '이전'} onSecondary={goPrev} primaryLabel={step === total - 1 ? '제출' : '다음'} onPrimary={handlePrimary} />
      </div>
    </SurveyShell>
  );
}
