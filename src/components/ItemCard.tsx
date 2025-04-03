
import { useState } from "react";
import { Item, getUserById } from "../data/items";
import { Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  onSwipe: (direction: 'left' | 'right') => void;
  className?: string;
}

const ItemCard = ({ item, onSwipe, className }: ItemCardProps) => {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const owner = getUserById(item.userId);

  const handleSwipe = (direction: 'left' | 'right') => {
    setExitDirection(direction);
    setTimeout(() => {
      onSwipe(direction);
      setExitDirection(null);
    }, 300);
  };

  return (
    <div 
      className={cn(
        "swipe-card w-full max-w-md mx-auto h-[500px]",
        exitDirection === 'left' && "swipe-card-exit-left",
        exitDirection === 'right' && "swipe-card-exit-right",
        className
      )}
    >
      <div className="relative h-[65%] bg-gray-200">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <span className="text-sm bg-primary/90 px-2 py-0.5 rounded-full">{item.condition}</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col h-[35%]">
        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
        <p className="text-sm line-clamp-3 mb-4">{item.description}</p>
        
        <div className="mt-auto flex items-center">
          {owner && (
            <>
              <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full" />
              <span className="ml-2 text-sm">{owner.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200"
        >
          <X className="text-gray-500" size={24} />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200"
        >
          <Heart className="text-primary" size={24} />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
