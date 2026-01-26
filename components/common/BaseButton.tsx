import { BaseButtonProps, sizeClasses, variantClasses } from '@/types/auth';

export default function BaseButton({ type = 'button', size, variant, className, children, ...props }: BaseButtonProps) {
  return (
    <button type={type} className={[sizeClasses[size], variantClasses[variant], `block h-13 font-medium text-[18px] shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-full cursor-pointer`, className].join(' ')} {...props}>
      {children}
    </button>
  );
}
