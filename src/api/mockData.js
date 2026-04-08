// mockData.js

export const mockUsers = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun@example.com",
    password: "Secure@123",
    phone: "9876543210",
    role: "CUSTOMER",
    createdAt: "2024-01-15T10:30:00"
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@foodapp.com",
    password: "Admin@123",
    phone: "9999999999",
    role: "ADMIN",
    createdAt: "2024-01-01T10:00:00"
  }
];

export const mockRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    description: "Authentic South Indian cuisine",
    address: "12 Anna Salai, Chennai",
    phone: "9876540001",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    isActive: true,
    rating: 4.5,
    createdAt: "2024-01-10T09:00:00"
  },
  {
    id: 2,
    name: "Burger Haven",
    description: "Classic American fast food",
    address: "45 MG Road, Bangalore",
    phone: "9876540002",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    isActive: true,
    rating: 4.2,
    createdAt: "2024-01-11T10:00:00"
  }
];

export const mockMenus = [
  {
    id: 101,
    restaurantId: 1,
    name: "Masala Dosa",
    description: "Crispy dosa with spiced potato filling",
    price: 80.00,
    category: "Breakfast",
    imageUrl: "https://images.unsplash.com/photo-1627845347271-8eb18af6b96b?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: 102,
    restaurantId: 1,
    name: "Filter Coffee",
    description: "Traditional brewed coffee",
    price: 30.00,
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1510972527921-ce6c2a41432f?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  },
  {
    id: 201,
    restaurantId: 2,
    name: "Cheese Burger",
    description: "Double cheese with beef patty",
    price: 250.00,
    category: "Main",
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600",
    isAvailable: true
  }
];

export const mockOrders = [];
