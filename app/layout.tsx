import './globals.css';
import { pretendard } from './fonts';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <ul className="flex gap-4 sticky top-0">
          <li>
            <Link href="/">메인 페이지</Link>
          </li>
          <li>
            <Link href="/survey">설문 페이지</Link>
          </li>
          <li>
            <Link href="/products">상품 목록</Link>
          </li>
          <li>
            <Link href="/mypage">마이페이지</Link>
          </li>
          <li>
            <Link href="/subscription">결제(구독)</Link>
          </li>
          <li>
            <Link href="/login">로그인</Link>
          </li>
          <li>
            <Link href="/signup">회원가입</Link>
          </li>
        </ul>

        {children}
      </body>
    </html>
  );
}
