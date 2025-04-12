
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface GlucoseReading {
  date: string;
  before: number;
  after: number;
}

interface GlucoseTableProps {
  title: string;
  readings: GlucoseReading[];
}

export function GlucoseTable({ title, readings }: GlucoseTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Before</TableHead>
              <TableHead>After</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.map((reading, index) => (
              <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medware-primary"></div>
                    {reading.date}
                  </div>
                </TableCell>
                <TableCell className={Number(reading.before) > 120 ? "table-row-dark" : ""}>{reading.before}</TableCell>
                <TableCell className={Number(reading.after) > 180 ? "table-row-dark" : ""}>{reading.after}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
