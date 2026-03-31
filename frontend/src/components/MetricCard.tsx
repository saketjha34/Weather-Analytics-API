import { ReactNode } from "react";
import Card from "./ui/Card";

interface MetricCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

const MetricCard = ({ label, value, icon }: MetricCardProps) => (
  <Card className="flex items-center gap-4 bg-white p-4 dark:bg-white/10">
    <div className="rounded-xl bg-slate-900/10 p-3 text-slate-700 dark:bg-white/10 dark:text-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-400">
        {label}
      </p>
      <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
        {value}
      </p>
    </div>
  </Card>
);

export default MetricCard;
