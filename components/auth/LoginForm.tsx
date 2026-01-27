import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';

export default function LoginForm() {
  return (
    <form action="">
      <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." error="이메일 형식이 올바르지 않습니다." />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." error="비밀번호는 최소 8자 이상이어야 합니다." />
      <div className="mt-15">
        <BaseButton type="submit" size="xl" variant="primary">
          로그인
        </BaseButton>
      </div>
      <p className="mt-3 pl-6.5 text-[14px] text-yg-warning">아이디 또는 비밀번호가 잘못되었습니다. 정확히 입력해 주세요.</p>
    </form>
  );
}
