import { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

interface BadgeProps {
  tone?: "success" | "warning" | "neutral";
  className?: string;
}

const Badge = ({ tone = "neutral", className, children }: PropsWithChildren<BadgeProps>) => {
  const tones = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
