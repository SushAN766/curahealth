
import { useEffect, useState } from "react";
import { HealthMetric } from "@/components/metrics/HealthMetric";
import { GlucoseChart } from "@/components/charts/GlucoseChart";
import { BloodPressureChart } from "@/components/charts/BloodPressureChart";
import { GlucoseTable } from "@/components/tables/GlucoseTable";
import { BloodPressureTable } from "@/components/tables/BloodPressureTable";
import { Calendar } from "@/components/metrics/Calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface MedicalEvent {
  date: string;
  event: string;
  doctor: string;
}

const Dashboard = () => {
  const [userName, setUserName] = useState("User");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  
  const [medicalHistory, setMedicalHistory] = useState<MedicalEvent[]>([
    { date: "Jan 15, 2024", event: "Annual Physical", doctor: "Dr. Smith" },
    { date: "Mar 22, 2024", event: "Flu Vaccination", doctor: "Dr. Johnson" },
    { date: "Apr 5, 2024", event: "Blood Work", doctor: "Dr. Patel" }
  ]);
  
  const [glucoseData, setGlucoseData] = useState([
    { date: "19 Jun", before: 85, after: 351 },
    { date: "20 Jun", before: 212, after: 123 },
    { date: "23 Jun", before: 32, after: 132 },
    { date: "26 Jun", before: 238, after: 568 },
    { date: "27 Jun", before: 133, after: 134 },
    { date: "30 Jun", before: 232, after: 123 },
    { date: "19 Dec", before: 215, after: 214 },
  ]);

  const [bpData, setBpData] = useState([
    { date: "19 Jun", low: 0, high: 2500 },
    { date: "20 Jun", low: 0, high: 200 },
    { date: "23 Jun", low: 0, high: 100 },
    { date: "26 Jun", low: 0, high: 450 },
    { date: "27 Jun", low: 0, high: 200 },
    { date: "30 Jun", low: 0, high: 100 },
    { date: "19 Dec", low: 0, high: 400 },
  ]);

  const [bpReadings, setBpReadings] = useState([
    { date: "19 Jun '23", reading: "145 / 23", status: "High / Low" },
    { date: "20 Jun '23", reading: "121 / 123", status: "High / Low" },
    { date: "23 Jun '23", reading: "59 / 56", status: "High / Low" },
    { date: "26 Jun '23", reading: "138 / 87", status: "High / Low" },
  ]);

  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    active: i + 1 === new Date().getDate(),
  }));
  
  useEffect(() => {
    const storedName = localStorage.getItem('currentUser');
    if (storedName) {
      setUserName(storedName);
    }
    
    const interval = setInterval(() => {
      refreshData();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshData = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBpData = bpData.map(item => ({
        ...item,
        high: item.high + Math.floor(Math.random() * 20) - 10,
        low: item.low + Math.floor(Math.random() * 5)
      }));
      
      const newGlucoseData = glucoseData.map(item => ({
        ...item,
        before: item.before + Math.floor(Math.random() * 10) - 5,
        after: item.after + Math.floor(Math.random() * 10) - 5
      }));
      
      setBpData(newBpData);
      setGlucoseData(newGlucoseData);
      setLastUpdated(new Date());
      
      toast.success("Dashboard data updated");
    } catch (error) {
      toast.error("Failed to update dashboard data");
      console.error("Failed to refresh data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          
                
             
          <div>
            <h1 className="text-3xl font-bold">Hi, {userName}</h1>
            <p className="text-lg text-gray-600">
              Check your Health!{" "}
              <span className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button 
              onClick={refreshData} 
              disabled={isLoading}
              className="bg-medware-primary text-white hover:bg-medware-secondary"
            >
              {isLoading ? "Updating..." : "Refresh Data"}
            </Button>
            <HealthMetric title="BMI" value="24.7" className="bg-blue-100 min-w-[100px] md:min-w-[140px]" />
          </div>
        </div>

        <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
          <div className={`${isMobile ? '' : 'lg:col-span-2'} grid gap-6`}>
            <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-6`}>
              <GlucoseChart title="Glucose Breakfast" data={glucoseData} />
              <BloodPressureChart title="Blood Pressure" data={bpData} />
            </div>

            <GlucoseTable 
              title="Glucose" 
              readings={glucoseData.map(d => ({
                date: d.date + " '23",
                before: d.before,
                after: d.after
              }))} 
            />
          </div>

          <div className="space-y-6">
            <Calendar month="Jul" year={2024} days={calendarDays} />
            
            <div className="glass-card p-4">
              <h3 className="text-xl font-semibold mb-4">Medical History</h3>
              {medicalHistory.length > 0 ? (
                <div className="space-y-3">
                  {medicalHistory.map((event, index) => (
                    <div key={index} className="border-b pb-2 last:border-b-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{event.event}</span>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{event.doctor}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-500 italic">
                  None
                </div>
              )}
            </div>
            
            <BloodPressureTable title="Blood Pressure" readings={bpReadings} />
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-6">Personal Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <h3 className="text-gray-500 mb-1">Age:</h3>
                <p className="font-semibold">45</p>
              </div>
              <div>
                <h3 className="text-gray-500 mb-1">Height:</h3>
                <p className="font-semibold">180</p>
              </div>
            </div>
            <div>
              <div className="mb-6">
                <h3 className="text-gray-500 mb-1">Sex:</h3>
                <p className="font-semibold">Male</p>
              </div>
              <div>
                <h3 className="text-gray-500 mb-1">Weight:</h3>
                <p className="font-semibold">80</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
