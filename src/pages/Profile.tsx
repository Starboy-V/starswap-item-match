
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
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Profile = () => {
  // Get the current user - in a real app this would come from auth
  const currentUser = users.find(user => user.id === "currentUser");
  const [activeTab, setActiveTab] = useState("posts");
  const [timeSwapModalOpen, setTimeSwapModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Mock saved items data
  const savedItems = userItems.slice(0, 4); // Just for demo purposes
  
  // Mock timeswap data
  const timeSwaps = [
    { id: 1, user: "alexsmith", imageUrl: "https://source.unsplash.com/random/300x300?portrait=1", timeOffered: "2 hours", lookingFor: "Graphic design help" },
    { id: 2, user: "jessicab", imageUrl: "https://source.unsplash.com/random/300x300?portrait=2", timeOffered: "1 hour", lookingFor: "Web development guidance" },
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start mb-8 profile-card p-4"
        >
          <Avatar className="w-20 h-20 border-2 border-primary box-glow">
            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
            <AvatarFallback className="bg-primary/20">{currentUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="mt-4 md:mt-0 md:ml-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-glow">{currentUser?.name}</h1>
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex mt-2 text-sm">
              <motion.div whileHover={{ scale: 1.05 }} className="mr-4">
                <span className="font-bold">{userItems.length}</span> posts
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="mr-4">
                <span className="font-bold">24</span> matches
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <span className="font-bold">8</span> swaps
              </motion.div>
            </div>
            
            <p className="mt-2 text-sm text-foreground/90">Swap enthusiast and collector of vintage items. Love to exchange and find treasures!</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="backdrop-blur-sm text-foreground">
                <Edit className="mr-1 h-4 w-4" />
                Edit Profile
              </Button>
              <Button 
                size="sm" 
                variant="default" 
                className="cosmic-button"
                onClick={() => setTimeSwapModalOpen(true)}
              >
                <Clock className="mr-1 h-4 w-4" />
                TimeSwap
              </Button>
              <Link to="/add-item">
                <Button size="sm" className="cosmic-button">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Post
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Content Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="profile-card p-4"
        >
          <Tabs defaultValue="posts" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 bg-muted/50 backdrop-blur-md">
              <TabsTrigger value="posts" className="data-[state=active]:bg-primary/30 data-[state=active]:backdrop-blur-md">
                <Grid3X3 className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-primary/30 data-[state=active]:backdrop-blur-md">
                <Bookmark className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="timeswaps" className="data-[state=active]:bg-primary/30 data-[state=active]:backdrop-blur-md">
                <Clock className="h-5 w-5" />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-4">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-1"
              >
                {userItems.map(item => (
                  <motion.div 
                    key={item.id} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="aspect-square rounded-md overflow-hidden neon-border"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-4">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-1"
              >
                {savedItems.map(item => (
                  <motion.div 
                    key={item.id} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="aspect-square rounded-md overflow-hidden neon-border"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="timeswaps" className="mt-4">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {timeSwaps.map(swap => (
                  <motion.div key={swap.id} variants={itemVariants}>
                    <Card className="p-4 bg-muted/50 backdrop-blur-md border-white/10 text-foreground">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 border border-primary/30">
                          <AvatarImage src={swap.imageUrl} alt={swap.user} />
                          <AvatarFallback className="bg-primary/20">{swap.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <h3 className="font-medium text-foreground">{swap.user}</h3>
                          <p className="text-sm text-foreground/70">Offering: {swap.timeOffered}</p>
                          <p className="text-sm text-foreground/70">Needs: {swap.lookingFor}</p>
                        </div>
                        <Button size="sm" className="ml-auto cosmic-button">
                          <MessageCircle className="mr-1 h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <Button variant="outline" className="w-full backdrop-blur-sm text-foreground border-primary/30">
                    <Plus className="mr-1 h-4 w-4" />
                    Create New TimeSwap
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Account Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 profile-card p-4"
        >
          <h2 className="text-lg font-semibold mb-3 text-foreground">Account Settings</h2>
          <div className="space-y-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 border border-white/10 rounded-lg flex items-center justify-center text-foreground backdrop-blur-sm"
            >
              Notification Preferences
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 border border-white/10 rounded-lg flex items-center justify-center text-foreground backdrop-blur-sm"
            >
              Privacy Settings
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(220, 38, 38, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 border border-destructive/20 rounded-lg text-destructive flex items-center justify-center backdrop-blur-sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </motion.button>
          </div>
        </motion.div>
      </main>
      
      <TimeSwapModal open={timeSwapModalOpen} onClose={() => setTimeSwapModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default Profile;
