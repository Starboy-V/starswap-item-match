
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { users, userItems } from "@/data/items";
import { Edit, LogOut, Plus, Settings, Grid3X3, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Profile = () => {
  // Get the current user - in a real app this would come from auth
  const currentUser = users.find(user => user.id === "currentUser");
  const [activeTab, setActiveTab] = useState("posts");

  // Mock stories and highlights data
  const stories = [
    { id: 1, imageUrl: "https://source.unsplash.com/random/300x300?trading=1", title: "New Item" },
    { id: 2, imageUrl: "https://source.unsplash.com/random/300x300?swap=2", title: "Recent Swap" },
    { id: 3, imageUrl: "https://source.unsplash.com/random/300x300?match=3", title: "Match" },
    { id: 4, imageUrl: "https://source.unsplash.com/random/300x300?trade=4", title: "Trade" },
  ];

  const highlights = [
    { id: 1, imageUrl: "https://source.unsplash.com/random/300x300?collection=1", title: "Favorites" },
    { id: 2, imageUrl: "https://source.unsplash.com/random/300x300?collection=2", title: "Antiques" },
    { id: 3, imageUrl: "https://source.unsplash.com/random/300x300?collection=3", title: "Electronics" },
  ];

  const savedItems = userItems.slice(0, 4); // Just for demo purposes

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
                <span className="font-bold">{userItems.length}</span> items
              </div>
              <div className="mr-4">
                <span className="font-bold">24</span> matches
              </div>
              <div>
                <span className="font-bold">8</span> swaps
              </div>
            </div>
            
            <div className="mt-3">
              <Button variant="outline" size="sm" className="mr-2">
                <Edit className="mr-1 h-4 w-4" />
                Edit Profile
              </Button>
              <Link to="/add-item">
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stories */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Stories</h2>
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2">
                <CarouselItem className="pl-2 basis-1/4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-primary">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs mt-1">New</span>
                  </div>
                </CarouselItem>
                {stories.map(story => (
                  <CarouselItem key={story.id} className="pl-2 basis-1/4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary p-0.5">
                        <img 
                          src={story.imageUrl} 
                          alt={story.title} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="text-xs mt-1">{story.title}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        
        {/* Highlights */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Highlights</h2>
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2">
                <CarouselItem className="pl-2 basis-1/4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border border-gray-300">
                      <Plus className="h-6 w-6 text-gray-500" />
                    </div>
                    <span className="text-xs mt-1">New</span>
                  </div>
                </CarouselItem>
                {highlights.map(highlight => (
                  <CarouselItem key={highlight.id} className="pl-2 basis-1/4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                        <img 
                          src={highlight.imageUrl} 
                          alt={highlight.title} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="text-xs mt-1">{highlight.title}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
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
            <TabsTrigger value="matches">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8.5C2 5 4 3.5 7 3.5C8.5 3.5 9.93063 4.15468 11 5.5C12.0694 4.15468 13.5 3.5 15 3.5C18 3.5 20 5 20 8.5C20 11.6667 17.4722 15.7778 11 20C4.52778 15.7778 2 11.6667 2 8.5Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
          
          <TabsContent value="matches" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {/* Mock matched items */}
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square">
                  <img 
                    src={`https://source.unsplash.com/random/300x300?match=${i}`} 
                    alt={`Match ${i}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
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
      
      <Footer />
    </div>
  );
};

export default Profile;
