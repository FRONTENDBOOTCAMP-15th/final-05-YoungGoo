// AuthInput 컴포넌트 props 타입 정의
export interface AuthInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  error?: string | null;
}

// BaseButton 컴포넌트 props 타입 정의
export const sizeClasses = {
  sm: 'w-23',
  md: 'w-34',
  lg: 'w-45',
  xl: 'w-full',
} as const;

export const variantClasses = {
  basePrimary: 'text-yg-primary bg-yg-white outline-1 outline-yg-primary',
  primary: 'text-white bg-yg-primary',
  baseSecondary: 'text-yg-secondary bg-yg-white outline-1 outline-yg-secondary',
  secondary: 'text-white bg-yg-secondary',
} as const;

type ButtonSize = keyof typeof sizeClasses;
type ButtonVariant = keyof typeof variantClasses;

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize;
  variant: ButtonVariant;
}
