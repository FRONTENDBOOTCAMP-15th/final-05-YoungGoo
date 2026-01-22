import { AuthButtonProps } from '@/types/auth';

export default function AuthButton({ type = 'button', children }: AuthButtonProps) {
  return (
    <div className="mt-15">
      <button type={type} className="block w-full h-15 font-medium text-white text-[22px] bg-yg-primary shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-full cursor-pointer">
        {children}
      </button>
    </div>
  );
}
