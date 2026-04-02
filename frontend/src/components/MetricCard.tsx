import { ReactNode } from "react";
import Card from "./ui/Card";

interface MetricCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

const MetricCard = ({ label, value, icon }: MetricCardProps) => (
  <Card className="flex items-center gap-4 bg-white p-4">
    <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
      {icon}
    </div>
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  </Card>
);

export default MetricCard;
