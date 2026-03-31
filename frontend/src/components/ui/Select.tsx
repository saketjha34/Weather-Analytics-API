import { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const Select = ({ label, className, children, ...props }: SelectProps) => (
  <label className="flex w-full flex-col gap-2 text-sm text-slate-600 dark:text-slate-200">
    <span className="font-medium text-slate-900 dark:text-slate-100">{label}</span>
    <select
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-base text-slate-900",
        "focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200",
        "dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:focus:border-white/40 dark:focus:ring-white/10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  </label>
);

export default Select;
