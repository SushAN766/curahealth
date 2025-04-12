
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DoctorCardProps {
  name: string;
  specialty: string;
  experience: string;
  address: string;
  available?: boolean;
  imageSrc?: string;
  onViewProfile?: () => void;
  onContact?: () => void;
}

export function DoctorCard({ 
  name, 
  specialty, 
  experience, 
  address, 
  available = true,
  imageSrc,
  onViewProfile,
  onContact
}: DoctorCardProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card className={`overflow-hidden ${isMobile ? 'h-full' : ''}`}>
      <div className="flex justify-center pt-6 pb-2">
        <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          {available ? (
            <img 
              src={imageSrc || "\assets\images\hero-img.svg"} 
              alt={name} 
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="relative w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
              <X className="text-red-500" size={48} />
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                <img 
                  src={imageSrc || ""} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="text-center pt-2 pb-0">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-500 text-sm">{specialty}</p>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 pt-4">
        <div className="flex w-full gap-2">
          <Button 
            variant="outline" 
            className="flex-1 bg-medware-primary text-white hover:bg-medware-secondary"
            onClick={onContact}
          >
            Contact
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onViewProfile}
          >
            View Profile
          </Button>
        </div>
        
        <div className="text-center text-xs text-gray-500">
          <p className="italic">{experience}</p>
          <p className="mt-1">Address:</p>
          <p>{address}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
