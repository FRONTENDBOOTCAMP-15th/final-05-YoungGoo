// AuthInput 컴포넌트 props 타입 정의
export interface AuthInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  error?: string | null;
}

// AuthButton 컴포넌트 props 타입 정의
export interface AuthButtonProps {
  type?: 'button' | 'reset' | 'submit';
  children: React.ReactNode;
}
