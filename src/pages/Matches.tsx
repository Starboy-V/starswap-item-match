
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { matches, getItemById, getUserById } from "@/data/items";
import { MessageCircle, Star } from "lucide-react";

const Matches = () => {
  // Group matches by date (for a real app, you'd want to sort them)
  const matchesWithData = matches.map(match => {
    const item = getItemById(match.matchedItemId);
    const userItem = getItemById(match.userItemId);
    const owner = item ? getUserById(item.userId) : undefined;
    
    return {
      ...match,
      item,
      userItem,
      owner
    };
  });

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="px-4 py-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="mr-2 text-primary" size={24} />
          Your Matches
        </h1>
        
        {matchesWithData.length > 0 ? (
          <div className="space-y-6">
            {matchesWithData.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    {match.owner && (
                      <img src={match.owner.avatar} alt={match.owner.name} className="w-10 h-10 rounded-full mr-3" />
                    )}
                    <div>
                      <h3 className="font-semibold">
                        {match.owner ? match.owner.name : 'Unknown User'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Matched {match.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex gap-4 mb-4">
                    {match.item && (
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Their item</p>
                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                          <img src={match.item.imageUrl} alt={match.item.title} className="w-full h-24 object-cover" />
                          <div className="p-2">
                            <h4 className="font-medium text-sm truncate">{match.item.title}</h4>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {match.userItem && (
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Your item</p>
                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                          <img src={match.userItem.imageUrl} alt={match.userItem.title} className="w-full h-24 object-cover" />
                          <div className="p-2">
                            <h4 className="font-medium text-sm truncate">{match.userItem.title}</h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full py-2 flex items-center justify-center bg-primary text-white rounded-lg">
                    <MessageCircle size={18} className="mr-2" />
                    Message to arrange swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
            <Star size={48} className="text-gray-300 mb-4" />
            <p className="text-xl font-medium text-gray-500">No matches yet</p>
            <p className="text-gray-400 mt-2 text-center px-6">Start swiping on items to find potential matches</p>
            <Link to="/" className="mt-6 text-primary font-semibold">Back to Swiping</Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Matches;
