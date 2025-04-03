
export interface Item {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  category: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Match {
  id: string;
  userItemId: string;
  matchedItemId: string;
  createdAt: Date;
}

// Mock users
export const users: User[] = [
  {
    id: "user1",
    name: "Alex Morgan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "user2",
    name: "Jamie Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "user3",
    name: "Sam Taylor",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: "currentUser",
    name: "You",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg"
  }
];

// Mock items data
export const items: Item[] = [
  {
    id: "item1",
    title: "Vintage Record Player",
    description: "Beautifully maintained vintage record player from the 70s. Works perfectly and sounds amazing!",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000",
    condition: "Good",
    category: "Electronics",
    userId: "user1"
  },
  {
    id: "item2",
    title: "Mountain Bike",
    description: "Trek mountain bike, 2 years old but well maintained. Perfect for trails and city riding.",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000",
    condition: "Like New",
    category: "Sports",
    userId: "user2"
  },
  {
    id: "item3",
    title: "Designer Coffee Table",
    description: "Mid-century modern coffee table, light scratches but overall great condition.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000",
    condition: "Good",
    category: "Furniture",
    userId: "user3"
  },
  {
    id: "item4",
    title: "Professional Camera",
    description: "Canon EOS 5D Mark IV with 24-70mm lens. Perfect for photography enthusiasts.",
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000",
    condition: "Like New",
    category: "Electronics",
    userId: "user1"
  },
  {
    id: "item5",
    title: "Leather Jacket",
    description: "Genuine leather jacket, worn only a few times. Size medium.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000",
    condition: "Like New",
    category: "Clothing",
    userId: "user2"
  }
];

// Mock matches
export const matches: Match[] = [
  {
    id: "match1",
    userItemId: "userItem1",
    matchedItemId: "item1",
    createdAt: new Date(2023, 5, 15)
  },
  {
    id: "match2",
    userItemId: "userItem2",
    matchedItemId: "item3",
    createdAt: new Date(2023, 5, 18)
  }
];

// User's own items
export const userItems: Item[] = [
  {
    id: "userItem1",
    title: "Gaming Console",
    description: "PlayStation 5 with two controllers and 3 games. Barely used.",
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1000",
    condition: "Like New",
    category: "Electronics",
    userId: "currentUser"
  },
  {
    id: "userItem2",
    title: "Acoustic Guitar",
    description: "Taylor acoustic guitar with case. Beautiful sound, some minor scratches.",
    imageUrl: "https://images.unsplash.com/photo-1556449895-a33c9dba33dd?q=80&w=1000",
    condition: "Good",
    category: "Musical Instruments",
    userId: "currentUser"
  }
];

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Get item by ID
export const getItemById = (id: string): Item | undefined => {
  return [...items, ...userItems].find(item => item.id === id);
};
