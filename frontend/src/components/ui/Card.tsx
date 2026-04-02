import { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  className?: string;
}

const Card = ({ className, children }: PropsWithChildren<CardProps>) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
      className
    )}
  >
    {children}
  </div>
);

export default Card;
