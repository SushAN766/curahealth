
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BloodPressureReading {
  date: string;
  reading: string;
  status: string;
}

interface BloodPressureTableProps {
  title: string;
  readings: BloodPressureReading[];
}

export function BloodPressureTable({ title, readings }: BloodPressureTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={3}>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.map((reading, index) => (
              <TableRow key={index} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-medware-primary"></div>
                    {reading.date}
                  </div>
                </TableCell>
                <TableCell>{reading.reading}</TableCell>
                <TableCell className="text-right">{reading.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
