
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Plus, ArrowRight, MessageCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import TimeSwapModal from "@/components/TimeSwapModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TimeSwap = () => {
  const [timeSwapModalOpen, setTimeSwapModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<null | { id: number; name: string; avatar: string }>(null);
  const [message, setMessage] = useState("");

  // Mock data for time swap offerings
  const timeSwapItems = [
    {
      id: 1,
      user: "Alex Smith",
      avatar: "https://source.unsplash.com/random/300x300?portrait=1",
      hours: 2,
      skills: "Graphic design, Photoshop, Illustrator",
      description: "I can help with your design needs. Let me know what you're looking for!",
      type: "offering"
    },
    {
      id: 2,
      user: "Jessica Brown",
      avatar: "https://source.unsplash.com/random/300x300?portrait=2",
      hours: 1,
      skills: "Web development, React, Node.js",
      description: "Need help with React or Node.js? I'm your person!",
      type: "offering"
    },
    {
      id: 3,
      user: "Michael Lee",
      avatar: "https://source.unsplash.com/random/300x300?portrait=3",
      hours: 3,
      skills: "Photography, Lightroom editing",
      description: "I can teach you photo editing techniques or help with your portfolio.",
      type: "seeking"
    },
    {
      id: 4,
      user: "Emma Wilson",
      avatar: "https://source.unsplash.com/random/300x300?portrait=4",
      hours: 2,
      skills: "Language tutoring, Spanish, French",
      description: "Looking for help with Spanish or French language practice.",
      type: "seeking"
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

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">TimeSwap</h1>
          <Button onClick={() => setTimeSwapModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Create TimeSwap
          </Button>
        </div>
        
        <Tabs defaultValue="browse">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="browse" className="flex-1">Browse</TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-4">
            <div className="grid gap-4">
              {timeSwapItems.map(item => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={item.avatar} alt={item.user} />
                        <AvatarFallback>{item.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{item.user}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {item.type === "offering" ? "Offering" : "Seeking"} {item.hours} {item.hours === 1 ? "hour" : "hours"}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold mb-1">Skills: {item.skills}</p>
                    <p className="text-sm">{item.description}</p>
                  </CardContent>
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
                {/* Chat header */}
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
                
                {/* Chat messages */}
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
                
                {/* Message input */}
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
