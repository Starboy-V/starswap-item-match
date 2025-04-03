
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center text-xl font-bold text-primary">
        <Star className="mr-2" fill="currentColor" size={24} />
        StarSwap
      </Link>
    </header>
  );
};

export default Header;
