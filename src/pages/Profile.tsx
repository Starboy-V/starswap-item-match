
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { users, userItems } from "@/data/items";
import { Edit, LogOut, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  // Get the current user - in a real app this would come from auth
  const currentUser = users.find(user => user.id === "currentUser");

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <img 
            src={currentUser?.avatar} 
            alt={currentUser?.name} 
            className="w-20 h-20 rounded-full mr-4 border-2 border-primary" 
          />
          <div>
            <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
            <Button variant="outline" size="sm" className="mt-2">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Items</h2>
            <Link to="/add-item">
              <Button size="sm" className="text-xs">
                <Plus className="mr-1 h-4 w-4" />
                Add New
              </Button>
            </Link>
          </div>
          
          {userItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {userItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="h-32">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-500">You haven't added any items yet</p>
              <Link to="/add-item">
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Item
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Account Settings</h2>
          <div className="space-y-3">
            <button className="w-full py-2 border rounded-lg flex items-center justify-center">
              Notification Preferences
            </button>
            <button className="w-full py-2 border rounded-lg flex items-center justify-center">
              Privacy Settings
            </button>
            <button className="w-full py-2 border rounded-lg text-destructive flex items-center justify-center">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
