
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface CalendarDay {
  day: number;
  active?: boolean;
}

interface CalendarProps {
  month: string;
  year: number;
  days: CalendarDay[];
}

export function Calendar({ month, year, days }: CalendarProps) {
  const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    toast.success(`Selected ${month} ${day}, ${year}`);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-medware-primary">{month}</CardTitle>
          <span className="text-gray-500">{year}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-sm text-gray-500 py-1">
              {day}
            </div>
          ))}
          
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`text-center p-1 rounded-full w-8 h-8 flex items-center justify-center mx-auto ${
                day.active 
                  ? "bg-medware-primary text-white" 
                  : day.day === selectedDay 
                    ? "bg-medware-secondary text-white"
                    : "hover:bg-gray-100 cursor-pointer"
              }`}
              onClick={() => handleDayClick(day.day)}
            >
              {day.day}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
