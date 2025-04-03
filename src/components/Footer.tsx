
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Plus, User } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] py-2">
      <div className="max-w-lg mx-auto px-4">
        <nav className="flex justify-around">
          <Link to="/" className={`nav-icon ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
            <Home size={24} />
            <span>Home</span>
          </Link>
          <Link to="/matches" className={`nav-icon ${isActive('/matches') ? 'text-primary' : 'text-gray-500'}`}>
            <Heart size={24} />
            <span>Matches</span>
          </Link>
          <Link to="/add-item" className={`nav-icon ${isActive('/add-item') ? 'text-primary' : 'text-gray-500'}`}>
            <Plus size={24} />
            <span>Add Item</span>
          </Link>
          <Link to="/profile" className={`nav-icon ${isActive('/profile') ? 'text-primary' : 'text-gray-500'}`}>
            <User size={24} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
