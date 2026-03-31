import { PropsWithChildren } from "react";
import Card from "./ui/Card";

interface SectionCardProps {
  title: string;
  description?: string;
}

const SectionCard = ({ title, description, children }: PropsWithChildren<SectionCardProps>) => (
  <Card className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
    {children}
  </Card>
);

export default SectionCard;
