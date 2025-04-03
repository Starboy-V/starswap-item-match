
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Package,
  Activity,
  Settings,
  Search,
  UserX,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { users, userItems } from "@/data/items";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const AdminHeader = () => (
  <div className="bg-primary text-primary-foreground py-4 px-6">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">StarSwap Admin</h1>
      <div className="flex items-center space-x-2">
        <span>Admin User</span>
      </div>
    </div>
  </div>
);

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Combined users and items for demo purposes
  const allUsers = [
    ...users,
    { id: "user3", name: "David Kim", avatar: "https://source.unsplash.com/random/300x300?portrait=3" },
    { id: "user4", name: "Sarah Johnson", avatar: "https://source.unsplash.com/random/300x300?portrait=4" },
    { id: "user5", name: "Michael Brown", avatar: "https://source.unsplash.com/random/300x300?portrait=5" },
  ];

  const allItems = [
    ...userItems,
    { id: "item5", title: "Vintage Watch", condition: "Good", imageUrl: "https://source.unsplash.com/random/300x300?watch" },
    { id: "item6", title: "Mountain Bike", condition: "Like New", imageUrl: "https://source.unsplash.com/random/300x300?bike" },
    { id: "item7", title: "Leather Jacket", condition: "Fair", imageUrl: "https://source.unsplash.com/random/300x300?jacket" },
  ];

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItems = allItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel",
    });
    navigate("/login");
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User deleted",
      description: `User ID ${userId} has been deleted`,
    });
  };

  const handleApproveItem = (itemId: string) => {
    toast({
      title: "Item approved",
      description: `Item ID ${itemId} has been approved`,
    });
  };

  const handleRejectItem = (itemId: string) => {
    toast({
      title: "Item rejected",
      description: `Item ID ${itemId} has been rejected`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      
      <div className="flex-1 container mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{allUsers.length}</div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{allItems.length}</div>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Swaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">12</div>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-500">Online</div>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <Tabs defaultValue="users">
            <div className="px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="items" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Package className="h-4 w-4 mr-2" />
                    Items
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <UserX className="h-4 w-4 mr-2" />
                    Reports
                  </TabsTrigger>
                </TabsList>
                
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <TabsContent value="users" className="p-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="items" className="p-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">Condition: {item.condition}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleApproveItem(item.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleRejectItem(item.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="reports" className="p-4">
              <div className="text-center py-8">
                <UserX className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No Reports</h3>
                <p className="text-muted-foreground">There are no reported users or items at this time.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
