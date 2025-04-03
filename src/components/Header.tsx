
import { Link } from "react-router-dom";
import { Star, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  // In a real app, this would check the auth state
  const isLoggedIn = false; 
  const isAdmin = false;

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center text-xl font-bold text-primary">
        <Star className="mr-2" fill="currentColor" size={24} />
        StarSwap
      </Link>
      
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ShieldCheck className="mr-1 h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <Button variant="outline" size="sm">
              <LogIn className="mr-1 h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
