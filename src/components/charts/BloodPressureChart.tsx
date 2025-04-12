
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BloodPressureDataPoint {
  date: string;
  low: number;
  high: number;
}

interface BloodPressureChartProps {
  title: string;
  data: BloodPressureDataPoint[];
}

export function BloodPressureChart({ title, data }: BloodPressureChartProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="low" fill="#FDA7DF" />
              <Bar dataKey="high" fill="#9980FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
