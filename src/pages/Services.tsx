
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Health Predictor</h2>
              <p className="text-gray-600 mb-6">
                Our advanced health prediction system analyzes your symptoms to provide 
                possible conditions you might be experiencing. This tool helps you understand
                your health concerns before seeking professional advice.
              </p>
              <Link to="/predictor">
                <Button className="w-full bg-medware-primary hover:bg-medware-secondary">
                  Try Health Predictor
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Medical Consultation</h2>
              <p className="text-gray-600 mb-6">
                Connect with qualified medical professionals through our platform. Find 
                specialists in various fields and get the expert opinion you need from
                the comfort of your home.
              </p>
              <Link to="/consult">
                <Button className="w-full bg-medware-primary hover:bg-medware-secondary">
                  Find a Doctor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
