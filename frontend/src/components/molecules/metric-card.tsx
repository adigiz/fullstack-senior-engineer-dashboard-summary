import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TMetricCardProps = {
  title: string;
  icon?: React.ReactNode;
  metric?: string;
  children: React.ReactNode;
};
const MetricCard: React.FC<
  TMetricCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({ children, metric, icon, title, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle>{title}</CardTitle>
        {icon && icon}
      </CardHeader>
      <CardContent>
        {metric && <div className="mb-1 text-2xl font-bold">{metric}</div>}
        {children}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
