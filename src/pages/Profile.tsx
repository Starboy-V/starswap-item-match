
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { users, userItems } from "@/data/items";
import { Edit, LogOut, Plus, Settings, Grid3X3, Bookmark, MessageCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import TimeSwapModal from "@/components/TimeSwapModal";

const Profile = () => {
  // Get the current user - in a real app this would come from auth
  const currentUser = users.find(user => user.id === "currentUser");
  const [activeTab, setActiveTab] = useState("posts");
  const [timeSwapModalOpen, setTimeSwapModalOpen] = useState(false);

  // Mock saved items data
  const savedItems = userItems.slice(0, 4); // Just for demo purposes
  
  // Mock timeswap data
  const timeSwaps = [
    { id: 1, user: "alexsmith", imageUrl: "https://source.unsplash.com/random/300x300?portrait=1", timeOffered: "2 hours", lookingFor: "Graphic design help" },
    { id: 2, user: "jessicab", imageUrl: "https://source.unsplash.com/random/300x300?portrait=2", timeOffered: "1 hour", lookingFor: "Web development guidance" },
  ];

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="flex items-start mb-8">
          <Avatar className="w-20 h-20 border-2 border-primary">
            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
            <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">{currentUser?.name}</h1>
              <Link to="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex mt-2 text-sm">
              <div className="mr-4">
                <span className="font-bold">{userItems.length}</span> posts
              </div>
              <div className="mr-4">
                <span className="font-bold">24</span> matches
              </div>
              <div>
                <span className="font-bold">8</span> swaps
              </div>
            </div>
            
            <p className="mt-2 text-sm">Swap enthusiast and collector of vintage items. Love to exchange and find treasures!</p>
            
            <div className="mt-3">
              <Button variant="outline" size="sm" className="mr-2">
                <Edit className="mr-1 h-4 w-4" />
                Edit Profile
              </Button>
              <Button 
                size="sm" 
                variant="default" 
                className="mr-2"
                onClick={() => setTimeSwapModalOpen(true)}
              >
                <Clock className="mr-1 h-4 w-4" />
                TimeSwap
              </Button>
              <Link to="/add-item">
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="posts">
              <Grid3X3 className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="timeswaps">
              <Clock className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {userItems.map(item => (
                <div key={item.id} className="aspect-square">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {savedItems.map(item => (
                <div key={item.id} className="aspect-square">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timeswaps" className="mt-4">
            <div className="space-y-4">
              {timeSwaps.map(swap => (
                <Card key={swap.id} className="p-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={swap.imageUrl} alt={swap.user} />
                      <AvatarFallback>{swap.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="font-medium">{swap.user}</h3>
                      <p className="text-sm text-gray-500">Offering: {swap.timeOffered}</p>
                      <p className="text-sm text-gray-500">Needs: {swap.lookingFor}</p>
                    </div>
                    <Button size="sm" className="ml-auto">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="mr-1 h-4 w-4" />
                Create New TimeSwap
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Account Settings */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
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
      
      <TimeSwapModal open={timeSwapModalOpen} onClose={() => setTimeSwapModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default Profile;
