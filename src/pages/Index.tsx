
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Index = () => {
  const navigate = useNavigate();
  
  const handleFeatureClick = (path: string) => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800"></span>
            <img src="\assets\images\logo.svg" alt="Medware Logo" className="h-8 w-auto ml-2" />
          </div>
          
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/about-us" className={navigationMenuTriggerStyle()}>
                    About Us
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/login" className={navigationMenuTriggerStyle()}>
                    Login
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/register" className={navigationMenuTriggerStyle()}>
                    Register
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Healthcare, Simplified</h1>
                <p className="text-xl text-gray-600 mb-8">Experience optimal health with simplified solutions, just a click away!</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button className="bg-medware-primary hover:bg-medware-secondary text-white px-8 py-6 rounded-md text-lg">
                      JOIN US!
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="px-8 py-6 rounded-md text-lg">
                      ALREADY A MEMBER?
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="order-first md:order-last">
                <img 
                  src="\assets\images\1.svg" 
                  alt="Healthcare illustration" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
           
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
             
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Health Predictor</h3>
                <div className="flex justify-center mb-8">
              <img
                   src="\assets\images\diseasepredictor.svg"
                   alt="Our Services Overview"
                   className="max-w-mdh-48 w-auto"
              />
            </div>
                <p className="text-gray-600 mb-6">Analyze your symptoms and get instant insights about potential health conditions.</p>
                <Button 
                  className="w-full bg-medware-primary hover:bg-medware-secondary" 
                  onClick={() => handleFeatureClick("/predictor")}
                >
                  Try Predictor
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Health Dashboard</h3>
                <div className="flex justify-center mb-8">
              <img
                   src="\assets\images\hero-img.svg"
                   alt="Our Services Overview"
                   className="max-w-mdh-48 w-auto"
              />
            </div>
                <p className="text-gray-600 mb-6">Track and monitor your health metrics in real-time with our intuitive dashboard.</p>
                <Button 
                  className="w-full bg-medware-primary hover:bg-medware-secondary" 
                  onClick={() => handleFeatureClick("/dashboard")}
                >
                  View Dashboard
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Doctor Consultations</h3>
                <div className="flex justify-center mb-8">
              <img
                   src="/assets/images/5.svg"
                   alt="Our Services Overview"
                   className=" max-w-mdh-48 w-auto"
              />
            </div>
                <p className="text-gray-600 mb-6">Connect with healthcare professionals for consultations and appointments.</p>
                <Button 
                  className="w-full bg-medware-primary hover:bg-medware-secondary" 
                  onClick={() => handleFeatureClick("/consult")}
                >
                  Find a Doctor
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
