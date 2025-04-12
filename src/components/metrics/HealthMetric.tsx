
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HealthMetricProps {
  title: string;
  value: string | number;
  className?: string;
  subtitle?: string;
}

export function HealthMetric({ title, value, className, subtitle }: HealthMetricProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
