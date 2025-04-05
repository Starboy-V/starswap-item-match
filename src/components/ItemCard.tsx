
import { useState, useRef } from "react";
import { Item, getUserById } from "../data/items";
import { Heart, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ItemCardProps {
  item: Item;
  onSwipe: (direction: 'left' | 'right') => void;
  className?: string;
}

const ItemCard = ({ item, onSwipe, className }: ItemCardProps) => {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const owner = getUserById(item.userId);

  const handleSwipe = (direction: 'left' | 'right') => {
    setExitDirection(direction);
    setTimeout(() => {
      onSwipe(direction);
      setExitDirection(null);
      setRotation({ x: 0, y: 0, z: 0 });
    }, 300);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation based on mouse position (limited to a small amount)
    const rotateY = (x / rect.width) * 10; // Max 10 degrees
    const rotateX = -(y / rect.height) * 10; // Max 10 degrees
    
    setRotation({ 
      x: rotateX, 
      y: rotateY, 
      z: 0 
    });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0, z: 0 });
  };

  return (
    <motion.div 
      ref={cardRef}
      className={cn(
        "swipe-card w-full max-w-md mx-auto h-[500px]",
        exitDirection === 'left' && "swipe-card-exit-left",
        exitDirection === 'right' && "swipe-card-exit-right",
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-[65%] bg-gradient-to-b from-purple-900/20 to-transparent">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
          <h3 className="text-xl font-bold text-glow">{item.title}</h3>
          <span className="text-sm bg-primary/90 px-2 py-0.5 rounded-full neon-border">{item.condition}</span>
        </div>
        
        <motion.div
          className="absolute top-2 right-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-secondary/30 backdrop-blur-sm p-1 rounded-full flex items-center box-glow">
            <Star className="text-yellow-400 h-4 w-4 mr-1" fill="currentColor" />
            <span className="text-xs font-bold">4.8</span>
          </div>
        </motion.div>
      </div>
      
      <div className="p-4 flex flex-col h-[35%]">
        <p className="text-sm text-secondary mb-2">{item.category}</p>
        <p className="text-sm line-clamp-3 mb-4">{item.description}</p>
        
        <div className="mt-auto flex items-center">
          {owner && (
            <>
              <div className="rounded-full border-2 border-primary/50 overflow-hidden box-glow">
                <img src={owner.avatar} alt={owner.name} className="w-8 h-8" />
              </div>
              <span className="ml-2 text-sm text-glow">{owner.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
        <motion.button 
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 box-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="text-gray-300" size={24} />
        </motion.button>
        <motion.button 
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 box-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="text-primary" size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ItemCard;
