import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const styles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/60",
        "disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
