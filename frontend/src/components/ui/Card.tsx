import { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  className?: string;
}

const Card = ({ className, children }: PropsWithChildren<CardProps>) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-glow backdrop-blur-xl",
      "dark:border-white/10 dark:bg-white/5",
      className
    )}
  >
    {children}
  </div>
);

export default Card;
