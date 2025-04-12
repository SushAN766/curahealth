
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const appointmentFormSchema = z.object({
  date: z.string().min(1, { message: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time slot" }),
  reason: z.string().min(5, { message: "Please briefly describe the reason for your visit" }),
  preferredContact: z.enum(["email", "phone"], { 
    required_error: "Please select a preferred contact method" 
  })
});

const Consult = () => {
  const [specialty, setSpecialty] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const isMobile = useIsMobile();

  // Contact form
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  // Appointment form
  const appointmentForm = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      date: "",
      time: "",
      reason: "",
      preferredContact: "email"
    }
  });
  
  // Mock data for doctors with enhanced details and ensuring all have images
  const doctors = [
    {
      name: "Dr. Benjamin Wilson",
      specialty: "Dermatologist",
      experience: "20 Years of Experience",
      address: "Calle Gran Vía, 45, Madrid, Spain",
      available: true,
      imageSrc: "https://images.unsplash.com/photo-1612636320854-776180f479d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc0fHxmZW1hbGUlMjBkb2N0b3JzfGVufDB8fDB8fHww",
      bio: "Dr. Wilson is a board-certified dermatologist specializing in both medical and cosmetic procedures. He graduated from Harvard Medical School and has been practicing for over 20 years.",
      education: "Universidad Autónoma de Madrid, Madrid, Spain",
      languages: "English, Spanish"
    },
    {
      name: "Dr. Sachin Thakur",
      specialty: "Surgeon",
      experience: "18 Years of Experience",
      address: "Sector 15, Dwarka, New Delhi, India",
      available: true,
      imageSrc: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&auto=format&fit=crop&q=60",
      bio: "Dr. Thakur is a renowned surgeon with expertise in minimally invasive procedures. He has performed over 5,000 successful surgeries throughout his career.",
      education: "Johns Hopkins University",
      languages: "English, Hindi"
    },
    {
  name: "Dr. Amina Al-Farsi",
  specialty: "Pediatrician",
  experience: "12 Years of Experience",
  address: "456 Jumeirah Beach Road, Jumeirah, Dubai, UAE",
  available: true,
  imageSrc: "https://plus.unsplash.com/premium_photo-1661746485873-93651651e873?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  bio: "Dr. Amina Al-Farsi is dedicated to children's health and development. She has special training in behavioral pediatrics and adolescent medicine, with a focus on providing culturally sensitive care.",
  education: "Dubai Medical College for Girls, Dubai, UAE",
  languages: "Arabic, English",
  rating: "4.8 out of 5 (98 reviews)",
  contact: "+971 4 123 4567",
  consultationFee: "AED 350 per session",
  workingHours: "Mon - Sat, 9:00 AM - 4:00 PM",
  hospitalAffiliation: "Rashid Hospital, Dubai"
},

    {
      name: "Dr. Emily Johnson",
      specialty: "Internal Medicine",
      experience: "10 Years of Experience",
      address: "202 King William Road, Adelaide, South Australia, Australia",
      available: true,
      imageSrc: "https://images.unsplash.com/photo-1670191247079-f9713ae06dcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY3fHxmZW1hbGUlMjBkb2N0b3JzfGVufDB8fDB8fHww",
      bio: "Dr. Johnson focuses on preventive care and managing chronic conditions. She takes a holistic approach to patient health and wellness.",
      education: "Flinders University, Adelaide, Australia",
      languages: "English"
    },
    {
      name: "Dr. Arjun Mehra",
      specialty: "Cardiologist",
      experience: "15 Years of Experience",
      address: "12 MG Road, Bengaluru, Karnataka, India",
      available: true,
      imageSrc: "https://images.unsplash.com/photo-1659353887222-630895f23cc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg0fHxmZW1hbGUlMjBkb2N0b3JzfGVufDB8fDB8fHww",
      bio: "Dr. Mehra is an interventional cardiologist who specializes in complex cardiac procedures. He has pioneered several innovative treatment approaches.",
      education: "Christian Medical College (CMC), Vellore",
      languages: "English, Hindi"
    },
    {
  name: "Dr. Ananya Iyer",
  specialty: "Neurologist",
  experience: "7 Years of Experience",
  address: "22 Bannerghatta Main Road, Bengaluru, Karnataka, India",
  available: true,
  imageSrc: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&auto=format&fit=crop&q=60",
  bio: "Dr. Iyer is a specialist in neurodegenerative disorders. Her research has contributed significantly to understanding Alzheimer's disease progression.",
  education: "National Institute of Mental Health and Neurosciences (NIMHANS), Bengaluru",
  languages: "English, Tamil, Hindi"
},



    {
  name: "Dr. Meera Raghavan",
  specialty: "General Medicine",
  experience: "12 Years of Experience",
  address: "Plot No. 5, Greams Road, Chennai, Tamil Nadu, India",
  available: true,
  imageSrc: "https://images.unsplash.com/photo-1683348758447-05c0c0755a2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjIwfHxmZW1hbGUlMjBkb2N0b3JzfGVufDB8fDB8fHww",
  bio: "Dr. Meera Raghavan is a general physician with a focus on diagnosing and treating a wide range of illnesses. She believes in holistic care and focuses on preventive health to maintain overall well-being.",
  education: "Madras Medical College, Chennai",
  languages: "English, Tamil, Hindi",
  rating: "4.7 out of 5 (105 reviews)",
  contact: "+91 98762 33445",
  consultationFee: "₹1,000 per session",
  workingHours: "Mon - Sat, 9:00 AM - 5:00 PM",
  hospitalAffiliation: "Fortis Malar Hospital, Chennai"
},

    {
      name: "Dr. Aarti Sharma",
      specialty: "Orthopedic Surgeon",
      experience: "5 Years of Experience",
      address: "A-123, Shakti Vihar, Pitampura, New Delhi, Delhi, India",
      available: true,
      imageSrc: "https://images.unsplash.com/photo-1659353888633-bc0db91345df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlbWFsZSUyMGRvY3RvcnN8ZW58MHx8MHx8fDA%3D",
      bio: "Dr. Aarti specializes in joint replacement and sports injuries, with a focus on minimally invasive techniques for quicker recovery.",
      education: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      languages: "English, Hindi ,Sanskrit",
      rating: "4.9 out of 5 (135 reviews)",
      contact: "(555) 654-3210",
      consultationFee: "$210 per session",
      workingHours: "Mon - Fri, 10:00 AM - 6:00 PM",
      hospitalAffiliation: "Advanced Orthopedic Institute"
}


  ];

  
  useEffect(() => {
    if (specialty === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        doctor => doctor.specialty.toLowerCase() === specialty.toLowerCase()
      );
      setFilteredDoctors(filtered);
      
      if (filtered.length === 0) {
        toast.info("No doctors found for this specialty");
      } else {
        toast.success(`Found ${filtered.length} doctor(s) for ${specialty}`);
      }
    }
  }, [specialty]);

  // Initialize with all doctors
  useEffect(() => {
    setFilteredDoctors(doctors);
  }, []);

  const handleSearch = () => {
    if (specialty === "") {
      setFilteredDoctors(doctors);
      toast.info("Showing all available doctors");
    } else {
      const filtered = doctors.filter(
        doctor => doctor.specialty.toLowerCase() === specialty.toLowerCase()
      );
      setFilteredDoctors(filtered);
      
      if (filtered.length === 0) {
        toast.info("No doctors found for this specialty");
      } else {
        toast.success(`Found ${filtered.length} doctor(s) for ${specialty}`);
      }
    }
  };

  const handleViewProfile = (doctor: any) => {
    setSelectedDoctor(doctor);
    setProfileOpen(true);
  };
  
  const handleContactSubmit = (values: z.infer<typeof contactFormSchema>) => {
    // In a real app, you would send this data to a server
    console.log("Contact form submitted:", values);
    toast.success(`Message sent successfully to ${selectedDoctor?.name || 'the doctor'}!`);
    setContactOpen(false);
    contactForm.reset();
  };
  
  const handleAppointmentSubmit = (values: z.infer<typeof appointmentFormSchema>) => {
    // In a real app, you would schedule the appointment in a database
    console.log("Appointment scheduled:", values);
    toast.success(`Appointment scheduled with ${selectedDoctor?.name} on ${values.date} at ${values.time}`);
    setAppointmentOpen(false);
    setProfileOpen(false);
    appointmentForm.reset();
  };
  
  const handleScheduleAppointment = () => {
    setProfileOpen(false);
    setAppointmentOpen(true);
  };
  
  const handleOpenContact = () => {
    setContactOpen(true);
  };

  const handleDoctorContact = (doctor: any) => {
    setSelectedDoctor(doctor);
    setContactOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4 mb-8`}>
          
          <div className="flex-1">
            
            <div className="relative">
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medware-primary appearance-none"
              >
                <option value="">Select a speciality..</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Surgeon">Surgeon</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path d="M6 9L12 3H0L6 9Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            className={`bg-medware-primary hover:bg-medware-secondary text-white ${isMobile ? 'w-full' : ''}`}
          >
            Search
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Find a Doctor</h1>
          <Button 
            variant="outline" 
            onClick={handleOpenContact}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Button>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No doctors found for this specialty</p>
            <p className="text-sm text-gray-400 mt-2">Please select a different specialty</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                name={doctor.name}
                specialty={doctor.specialty}
                experience={doctor.experience}
                address={doctor.address}
                available={doctor.available}
                imageSrc={doctor.imageSrc}
                onViewProfile={() => handleViewProfile(doctor)}
                onContact={() => handleDoctorContact(doctor)}
              />
            ))}
          </div>
        )}
        
        {/* Doctor Profile Dialog */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="max-w-md">
            {selectedDoctor && (
              <>
                <DialogHeader className="text-center">
                  <DialogTitle className="text-xl">{selectedDoctor.name}</DialogTitle>
                  <DialogDescription>{selectedDoctor.specialty}</DialogDescription>
                </DialogHeader>
                
                <div className="flex flex-col items-center space-y-4 mt-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedDoctor.imageSrc} alt={selectedDoctor.name} />
                    <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">{selectedDoctor.experience}</p>
                    <p className="text-sm text-gray-500 mt-1">Available: {selectedDoctor.available ? 'Yes' : 'No'}</p>
                  </div>
                  
                  <div className="w-full space-y-4 mt-4">
                    <div>
                      <h3 className="font-medium text-gray-900">About</h3>
                      <p className="text-sm text-gray-500 mt-1">{selectedDoctor.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">Education</h3>
                      <p className="text-sm text-gray-500 mt-1">{selectedDoctor.education}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">Languages</h3>
                      <p className="text-sm text-gray-500 mt-1">{selectedDoctor.languages}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">Office Address</h3>
                      <p className="text-sm text-gray-500 mt-1">{selectedDoctor.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex w-full gap-3">
                    <Button 
                      className="flex-1 bg-medware-primary hover:bg-medware-secondary text-white"
                      onClick={() => handleDoctorContact(selectedDoctor)}
                    >
                      Contact
                    </Button>
                    
                    <Button 
                      className="flex-1 mt-0"
                      onClick={handleScheduleAppointment}
                      disabled={!selectedDoctor.available}
                      variant="outline"
                    >
                      {selectedDoctor.available ? "Schedule Appointment" : "Currently Unavailable"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Contact Form Dialog */}
        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contact {selectedDoctor ? selectedDoctor.name : 'Us'}</DialogTitle>
              <DialogDescription>
                {selectedDoctor 
                  ? `Send a message to ${selectedDoctor.name} and they'll get back to you as soon as possible.` 
                  : 'Have questions? Send us a message and we\'ll get back to you as soon as possible.'}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...contactForm}>
              <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-4">
                <FormField
                  control={contactForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <Mail size={16} />
                          </span>
                          <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <Phone size={16} />
                          </span>
                          <Input type="tel" placeholder="Your phone number" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?"
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-medware-primary hover:bg-medware-secondary">
                    Send Message
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Appointment Booking Dialog */}
        <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule an Appointment</DialogTitle>
              <DialogDescription>
                {selectedDoctor && `Book your appointment with ${selectedDoctor.name}`}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...appointmentForm}>
              <form onSubmit={appointmentForm.handleSubmit(handleAppointmentSubmit)} className="space-y-4">
                <FormField
                  control={appointmentForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <Calendar size={16} />
                          </span>
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={appointmentForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <Clock size={16} />
                          </span>
                          <select
                            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medware-primary"
                            {...field}
                          >
                            <option value="">Select a time</option>
                            <option value="09:00 AM">09:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="01:00 PM">01:00 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={appointmentForm.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Visit</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly describe your symptoms or reason for appointment"
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={appointmentForm.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone">Phone</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-medware-primary hover:bg-medware-secondary">
                    Confirm Appointment
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Consult;
