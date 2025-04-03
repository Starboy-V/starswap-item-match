
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Upload } from "lucide-react";

const categories = [
  "Electronics", 
  "Clothing", 
  "Books", 
  "Home", 
  "Furniture", 
  "Sports", 
  "Toys", 
  "Musical Instruments",
  "Tools",
  "Other"
];

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const AddItem = () => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Item Added Successfully",
        description: "Your item has been added and is ready for swapping.",
      });
      
      // In a real app, we would redirect to the user's items page
      // or clear the form
      setImagePreview(null);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="px-4 py-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Item</h1>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image">Item Image</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg ${
                    imagePreview ? 'border-primary/40' : 'border-gray-300'
                  } h-48 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden`}
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <input 
                    type="file" 
                    id="image" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                  
                  {imagePreview ? (
                    <div className="absolute inset-0">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-tl-md">
                        Change
                      </div>
                    </div>
                  ) : (
                    <>
                      <Camera size={32} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload an image</p>
                      <p className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="What are you offering?" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your item in detail" 
                  rows={4}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !imagePreview}
              >
                {isSubmitting ? "Adding Item..." : "Add Item"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddItem;
