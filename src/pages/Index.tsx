
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import { items } from "@/data/items";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentItems, setCurrentItems] = useState([...items]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentItems.length === 0) return;
    
    const newItems = [...currentItems];
    const swipedItem = newItems.shift();
    
    setCurrentItems(newItems);
    
    if (direction === 'right' && swipedItem) {
      toast({
        title: "You liked this item!",
        description: `You liked ${swipedItem.title}`,
      });
    }
    
    if (currentItems.length === 1) {
      setIsLoading(true);
      // Simulate loading more items
      setTimeout(() => {
        setCurrentItems([...items]);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="px-4 py-6 max-w-md mx-auto">
        {currentItems.length > 0 ? (
          <div className="relative h-[500px]">
            {/* Only render the top card for better performance */}
            <ItemCard 
              item={currentItems[0]} 
              onSwipe={handleSwipe}
              className="absolute top-0 left-0 right-0 z-10"
            />
            
            {/* Show a preview of the next card */}
            {currentItems.length > 1 && (
              <div className="absolute top-2 left-0 right-0 scale-[0.98] opacity-70 z-0">
                <ItemCard 
                  item={currentItems[1]} 
                  onSwipe={() => {}}
                  className="pointer-events-none"
                />
              </div>
            )}
          </div>
        ) : isLoading ? (
          <div className="h-[500px] flex flex-col items-center justify-center">
            <div className="animate-spin mb-4">
              <Star size={40} className="text-primary" />
            </div>
            <p className="text-gray-500">Finding more items...</p>
          </div>
        ) : (
          <div className="h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
            <Star size={48} className="text-gray-300 mb-4" />
            <p className="text-xl font-medium text-gray-500">No more items</p>
            <p className="text-gray-400 mt-2">Check back later for more items to swap</p>
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">How to use StarSwap</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Swipe right on items you'd like to swap for</li>
              <li>Swipe left on items you're not interested in</li>
              <li>If the owner likes your items too, it's a match!</li>
              <li>Add your own items to increase your chances</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
