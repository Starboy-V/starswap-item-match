
import { useState, useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { items } from "@/data/items";
import { Star, Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load the ItemCard component to improve initial load time
const ItemCard = lazy(() => import("@/components/ItemCard"));

const Home = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { toast } = useToast();

  // Load items with a delay to improve perceived performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentItems([...items]);
      setIsLoading(false);
      setIsInitialLoad(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
      // Simulate loading more items with a shorter timeout
      setTimeout(() => {
        setCurrentItems([...items]);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-background to-background/90">
      <Header />
      
      <main className="px-4 py-6 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {isInitialLoad ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[500px] flex flex-col items-center justify-center"
            >
              <motion.div 
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }} 
                transition={{ 
                  rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                  scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                className="mb-4"
              >
                <Star size={40} className="text-primary" />
              </motion.div>
              <p className="text-gray-500">Loading amazing items...</p>
            </motion.div>
          ) : currentItems.length > 0 ? (
            <motion.div 
              key="items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px]"
            >
              <Suspense fallback={
                <div className="h-[500px] flex items-center justify-center">
                  <Loader className="animate-spin text-primary" size={30} />
                </div>
              }>
                {/* Only render the top card for better performance */}
                <ItemCard 
                  item={currentItems[0]} 
                  onSwipe={handleSwipe}
                  className="absolute top-0 left-0 right-0 z-10"
                />
                
                {/* Show a preview of the next card with 3D effect */}
                {currentItems.length > 1 && (
                  <motion.div 
                    className="absolute top-2 left-0 right-0 z-0"
                    style={{ 
                      transform: "perspective(1000px) rotateX(5deg)", 
                      transformStyle: "preserve-3d",
                      scale: 0.98,
                      opacity: 0.7
                    }}
                    whileHover={{ scale: 0.985 }}
                  >
                    <ItemCard 
                      item={currentItems[1]} 
                      onSwipe={() => {}}
                      className="pointer-events-none shadow-xl"
                    />
                  </motion.div>
                )}
              </Suspense>
            </motion.div>
          ) : isLoading ? (
            <motion.div 
              key="reloading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[500px] flex flex-col items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="mb-4"
              >
                <Star size={40} className="text-primary" />
              </motion.div>
              <p className="text-gray-500">Finding more items...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl backdrop-blur-sm"
              style={{ 
                transform: "perspective(1000px) rotateX(5deg)", 
                transformStyle: "preserve-3d"
              }}
            >
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [0, 10, -10, 0]
                }} 
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut" 
                }}
              >
                <Star size={48} className="text-primary mb-4" />
              </motion.div>
              <p className="text-xl font-medium text-gray-500">No more items</p>
              <p className="text-gray-400 mt-2">Check back later for more items to swap</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold mb-3">How to use StarSwap</h2>
          <div className="bg-white p-4 rounded-lg shadow-md backdrop-blur-sm border border-gray-100"
               style={{ 
                 transform: "perspective(1000px) rotateX(2deg)", 
                 transformStyle: "preserve-3d"
               }}>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Swipe right on items you'd like to swap for</li>
              <li>Swipe left on items you're not interested in</li>
              <li>If the owner likes your items too, it's a match!</li>
              <li>Add your own items to increase your chances</li>
            </ol>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
