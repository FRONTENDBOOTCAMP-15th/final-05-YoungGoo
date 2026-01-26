import type { ReactNode } from 'react';

type SurveyShellProps = {
  title?: string;
  children: ReactNode;
};

export default function SurveyShell({ title = '설문 페이지', children }: SurveyShellProps) {
  return (
    <main className="min-h-dvh bg-[var(--color-yg-white)]">
      {/* 전체 페이지 폭 max-w-6xl*/}
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        {/* 상단 라벨 */}
        <div className="pt-6 lg:pt-8 text-center text-sm font-medium text-[var(--color-yg-gray)]">{title}</div>

        {/* 내부 설문 컨텐츠 폭 */}
        <section
          className="
            mx-auto
            flex
            min-h-[calc(100dvh-56px)]
            w-full
            max-w-[640px]
            lg:max-w-[720px]
            flex-col
          "
        >
          <div className="flex flex-1 flex-col justify-center py-10 lg:py-12">
            <div className="px-3 lg:px-0">{children}</div>
          </div>

          <div className="h-8 lg:h-10" />
        </section>
      </div>
    </main>
  );
}
