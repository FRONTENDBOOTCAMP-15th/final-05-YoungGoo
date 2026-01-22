import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <header className="flex flex-col items-center mt-25">
        <Link href="/">
          <Image width={107} height={107} src="/icons/logo.svg" alt="영구 로고" className="block mx-auto" />
        </Link>
        <h1 className="font-bold text-5xl text-center">로그인</h1>
      </header>

      <div className="max-w-146.25 mx-auto mt-24">
        <LoginForm />
      </div>

      <div className="flex justify-center items-center max-w-146.25 mx-auto mt-24">
        <Link href="/signup" className="font-medium text-xl text-yg-primary">
          회원가입
        </Link>
        <span className="inline-block mx-6 text-xl text-yg-primary">|</span>
        <Link href="/signup" className="font-medium text-xl text-yg-primary">
          비밀번호 찾기
        </Link>
      </div>
    </>
  );
}
