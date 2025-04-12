
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">About Medware</h1>
        <div className="flex justify-center mb-8">
                <img 
                  src="\assets\images\dashboard-hero.svg" 
                  alt="" 
                  className="max-w-md w-full h-auto"
                />
              </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At Medware, our mission is to revolutionize healthcare through innovative technology. 
              We are committed to creating digital solutions that make healthcare more accessible, 
              personalized, and efficient for everyone.
            </p>
            <p className="text-gray-600 mb-6">
              Our goal is to empower individuals to take control of their health journey by 
              providing intuitive, user-friendly digital tools that bridge the gap between 
              patients and healthcare providers.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Medware was founded by a passionate group of healthcare professionals, 
              technology experts, and innovators who believe in the transformative power 
              of digital health solutions.
            </p>
            <p className="text-gray-600 mb-6">
              Our multidisciplinary team brings together expertise in medicine, 
              software development, user experience design, and data science to create 
              comprehensive healthcare technologies that truly make a difference.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/login">
            <Button className="bg-medware-primary hover:bg-medware-secondary text-white px-8 py-3 rounded-md text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
