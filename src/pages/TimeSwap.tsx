
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Plus, ArrowRight, MessageCircle, Heart, Share2, MessageSquare, Timer } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import TimeSwapModal from "@/components/TimeSwapModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

const TimeSwap = () => {
  const [timeSwapModalOpen, setTimeSwapModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<null | { id: number; name: string; avatar: string }>(null);
  const [message, setMessage] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  // Mock data for time swap offerings with images/videos and social features
  const timeSwapItems = [
    {
      id: 1,
      user: "Alex Smith",
      avatar: "https://source.unsplash.com/random/300x300?portrait=1",
      hours: 2,
      skills: "Graphic design, Photoshop, Illustrator",
      description: "Just finished this new design project! Anyone interested in learning these techniques?",
      type: "offering",
      media: "https://source.unsplash.com/random/600x800?design=1",
      likes: 24,
      comments: 5,
      isVideo: false,
      swapType: "skills",
      duration: "2 hours"
    },
    {
      id: 2,
      user: "Jessica Brown",
      avatar: "https://source.unsplash.com/random/300x300?portrait=2",
      hours: 1,
      skills: "Web development, React, Node.js",
      description: "Built this React component library in my spare time. Happy to teach in exchange for cooking lessons!",
      type: "offering",
      media: "https://source.unsplash.com/random/600x800?coding=1",
      likes: 18,
      comments: 3,
      isVideo: false,
      swapType: "skills",
      duration: "1 hour"
    },
    {
      id: 3,
      user: "Michael Lee",
      avatar: "https://source.unsplash.com/random/300x300?portrait=3",
      itemName: "DSLR Camera",
      description: "Lending my Canon EOS for a weekend photoshoot. Perfect for nature photography!",
      type: "offering",
      media: "https://source.unsplash.com/random/600x800?camera=1",
      likes: 56,
      comments: 12,
      isVideo: false,
      swapType: "items",
      duration: "3 days"
    },
    {
      id: 4,
      user: "Emma Wilson",
      avatar: "https://source.unsplash.com/random/300x300?portrait=4",
      itemName: "MacBook Pro",
      description: "Need to borrow a MacBook for my trip next week. Will provide deposit and take good care of it!",
      type: "seeking",
      media: "https://source.unsplash.com/random/600x800?laptop=1",
      likes: 32,
      comments: 8,
      isVideo: true,
      swapType: "items",
      duration: "5 days"
    }
  ];

  // Mock chat contacts
  const chatContacts = [
    { id: 1, name: "Alex Smith", avatar: "https://source.unsplash.com/random/300x300?portrait=1", lastMessage: "I can help with your design needs!" },
    { id: 2, name: "Jessica Brown", avatar: "https://source.unsplash.com/random/300x300?portrait=2", lastMessage: "When are you available to chat?" },
    { id: 3, name: "Michael Lee", avatar: "https://source.unsplash.com/random/300x300?portrait=3", lastMessage: "Thanks for your time yesterday!" },
  ];

  // Mock chat messages
  const chatMessages = selectedChat ? [
    { id: 1, sender: "them", message: "Hi there! I saw your TimeSwap offer.", time: "2:30 PM" },
    { id: 2, sender: "me", message: "Hey! Yes, I'm available to help. What do you need?", time: "2:32 PM" },
    { id: 3, sender: "them", message: "I need some help with graphic design for my website.", time: "2:35 PM" },
    { id: 4, sender: "me", message: "I'd be happy to help! When would you like to schedule our time swap?", time: "2:38 PM" },
  ] : [];

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // In a real app, this would send the message to a backend
      console.log(`Sending message to ${selectedChat.name}: ${message}`);
      setMessage("");
    }
  };

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">TimeSwap</h1>
            <Badge variant="outline" className="ml-2">Temporary Exchanges</Badge>
          </div>
          <Button onClick={() => setTimeSwapModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Create TimeSwap
          </Button>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-lg mb-6 flex items-center justify-between">
          <div className="text-sm">
            <p className="font-medium">Looking for permanent swaps?</p>
            <p className="text-muted-foreground text-xs">Visit StarSwap for lifetime exchanges</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/">Go to StarSwap</a>
          </Button>
        </div>
        
        <Tabs defaultValue="browse">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="browse" className="flex-1">Browse</TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-6">
            <div className="grid gap-6">
              {timeSwapItems.map(item => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={item.avatar} alt={item.user} />
                        <AvatarFallback>{item.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{item.user}</CardTitle>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Badge variant="outline" className="mr-2 text-xs font-normal">
                            {item.type === "offering" ? 
                              (item.swapType === "skills" ? "Offering Skills" : "Lending Item") : 
                              (item.swapType === "skills" ? "Seeking Skills" : "Borrowing Item")}
                          </Badge>
                          <Timer className="h-3.5 w-3.5 mr-1" />
                          {item.duration}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <AspectRatio ratio={4/5} className="bg-muted">
                    {item.isVideo ? (
                      <video 
                        src={item.media} 
                        controls 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img 
                        src={item.media} 
                        alt={`${item.user}'s post`}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </AspectRatio>
                  
                  <div className="p-4 pb-0">
                    <div className="flex space-x-4 mb-2">
                      <button 
                        onClick={() => toggleLike(item.id)}
                        className="flex items-center"
                      >
                        <Heart 
                          className={`h-6 w-6 mr-1 ${likedPosts.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} 
                        />
                        <span className="text-sm">{likedPosts.includes(item.id) ? item.likes + 1 : item.likes}</span>
                      </button>
                      <button className="flex items-center">
                        <MessageSquare className="h-6 w-6 mr-1" />
                        <span className="text-sm">{item.comments}</span>
                      </button>
                      <button className="flex items-center ml-auto">
                        <Share2 className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm"><span className="font-semibold">{item.user}</span> {item.description}</p>
                    </div>
                    {item.swapType === "skills" ? (
                      <p className="text-sm font-medium text-muted-foreground mb-2">Skills: {item.skills}</p>
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground mb-2">Item: {item.itemName}</p>
                    )}
                  </div>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="mr-2"
                      onClick={() => setSelectedChat({ id: item.id, name: item.user, avatar: item.avatar })}
                    >
                      <MessageCircle className="mr-1 h-4 w-4" />
                      Message
                    </Button>
                    <Button>
                      Request Swap
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="chat">
            {!selectedChat ? (
              <div className="grid grid-cols-1 gap-2">
                {chatContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className="p-3 border rounded-lg flex items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedChat(contact)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <div className="p-3 border-b flex items-center bg-gray-50">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="mr-2"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                    <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{selectedChat.name}</span>
                </div>
                
                <div className="p-4 h-80 overflow-y-auto space-y-3">
                  {chatMessages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'me' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t flex">
                  <Input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 mr-2"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <TimeSwapModal open={timeSwapModalOpen} onClose={() => setTimeSwapModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default TimeSwap;
