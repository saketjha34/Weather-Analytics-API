import { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const Select = ({ label, className, children, ...props }: SelectProps) => (
  <label className="flex w-full flex-col gap-2 text-sm text-slate-600">
    <span className="font-medium text-slate-900">{label}</span>
    <select
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base text-slate-900",
        "focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </select>
  </label>
);

export default Select;
