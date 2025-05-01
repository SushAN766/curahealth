
import { Link, Outlet, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const AppLayout = () => {
  const location = useLocation();
  const isAboutUsPage = location.pathname === "/about-us";
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-800"></span>
            <img src="\assets\images\medcare-logo.svg" alt="Medware Logo" className="h-8 w-auto ml-2" />
          </Link>
          
          <nav className="flex items-center gap-6">
            {isAboutUsPage ? (
              <>
                <NavLink href="/login" isActive={location.pathname === "/login"}>
                  Login
                </NavLink>
                <NavLink href="/register" isActive={location.pathname === "/register"}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink href="/predictor" isActive={location.pathname === "/predictor"}>
                  Predictor
                </NavLink>
                <NavLink href="/dashboard" isActive={location.pathname === "/dashboard"}>
                  Dashboard
                </NavLink>
                <NavLink href="/consult" isActive={location.pathname === "/consult"}>
                  Consult
                </NavLink>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-gray-900 flex items-center gap-1 font-medium"
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, isActive, children }: NavLinkProps) => {
  return (
    <Link
      to={href}
      className={`font-medium ${
        isActive
          ? "text-medware-primary border-b-2 border-medware-primary"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
};

export default AppLayout;
