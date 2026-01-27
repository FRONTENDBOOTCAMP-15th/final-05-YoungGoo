import type { AuthInputProps } from '@/types/auth';

export default function AuthInput({ label, name, type = 'text', placeholder, error }: AuthInputProps) {
  return (
    <div className="mb-6 last-of-type:mb-0">
      <label htmlFor={name} className="inline-block mb-3 pl-6.5 font-medium text-yg-primary text-xl">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="block w-full py-3.5 px-6.5 text-[22px] text-yg-black bg-yg-white placeholder-yg-lightgray shadow-[0_0_15px_rgba(0,0,0,0.15)] focus:outline focus:outline-yg-primary focus:shadow-[0_4px_15px_rgba(0,0,0,0.2)] rounded-full"
      />
      {error && <p className="mt-3 pl-6.5 text-[14px] text-yg-warning">{error}</p>}
    </div>
  );
}
