import { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, className, ...props }: InputProps) => (
  <label className="flex w-full flex-col gap-2 text-sm text-slate-600">
    <span className="font-medium text-slate-900">{label}</span>
    <input
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base text-slate-900",
        "placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200",
        className
      )}
      {...props}
    />
  </label>
);

export default Input;
