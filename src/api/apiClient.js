import { mockUsers, mockRestaurants, mockMenus, mockOrders } from './mockData';

// Helper to delay simulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for wrappers
const successResponse = (data, message = "Operation successful") => ({
  success: true, message, data
});
const errorResponse = (message, status = 400) => {
  throw { response: { status, data: { success: false, message } } };
};

// In-memory state (initialize from localStorage if possible)
let users = [...mockUsers];
let restaurants = [...mockRestaurants];
let menus = [...mockMenus];
let orders = [...mockOrders];

// Cart State (stored per user in memory for now)
// Map of userId -> cart object
let carts = {};

const getCartForUser = (userId) => {
  if (!carts[userId]) carts[userId] = { restaurantId: null, items: [], totalAmount: 0, count: 0 };
  return carts[userId];
};

export const api = {
  // --- AUTH --- //
  login: async (email, password) => {
    await delay(500);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw errorResponse("Invalid email or password", 401);
    
    // Simulate JWT token
    const token = `fake-jwt-token-for-${user.id}`;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return successResponse({ token, tokenType: 'Bearer', user }, "Login successful");
  },

  register: async (data) => {
    await delay(500);
    if (users.find(u => u.email === data.email)) throw errorResponse("Email already registered", 409);
    
    const newUser = {
      id: users.length + 1,
      ...data,
      role: 'CUSTOMER',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return successResponse(newUser, "Registration successful");
  },

  getMe: async () => {
    await delay(300);
    const userStr = localStorage.getItem('user');
    if (!userStr) throw errorResponse("Unauthorized", 401);
    return successResponse(JSON.parse(userStr), "Profile fetched");
  },

  updateProfile: async (data) => {
    await delay(300);
    const userStr = localStorage.getItem('user');
    if (!userStr) throw errorResponse("Unauthorized", 401);
    
    let user = JSON.parse(userStr);
    user = { ...user, ...data };
    
    // Update memory
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) users[idx] = user;
    
    // Update local storage
    localStorage.setItem('user', JSON.stringify(user));
    
    return successResponse(user, "Profile updated");
  },

  // --- RESTAURANTS --- //
  getRestaurants: async () => {
    await delay(300);
    return successResponse(restaurants);
  },

  getRestaurantById: async (id) => {
    await delay(300);
    const rest = restaurants.find(r => r.id === parseInt(id));
    if (!rest) throw errorResponse("Not found", 404);
    return successResponse(rest);
  },

  // --- MENUS --- //
  getMenus: async (restaurantId) => {
    await delay(300);
    const m = menus.filter(m => m.restaurantId === parseInt(restaurantId) && m.isAvailable);
    return successResponse(m);
  },

  // --- CART (Requires User ID Context, simulated via logged in user) --- //
  _getCurrentUser: () => JSON.parse(localStorage.getItem('user')),

  getCart: async () => {
    await delay(300);
    const user = api._getCurrentUser();
    if (!user) throw errorResponse("Unauthorized", 401);
    const cart = getCartForUser(user.id);
    
    let totalAmt = 0;
    let count = 0;
    cart.items.forEach(item => {
      totalAmt += item.subTotal;
      count += item.quantity;
    });
    cart.totalAmount = totalAmt;
    cart.itemCount = count;
    
    return successResponse(cart);
  },

  addToCart: async ({ menuItemId, quantity }) => {
    await delay(300);
    const user = api._getCurrentUser();
    if (!user) throw errorResponse("Unauthorized", 401);
    
    const item = menus.find(m => m.id === parseInt(menuItemId));
    if (!item) throw errorResponse("Item not found", 404);
    
    const cart = getCartForUser(user.id);
    
    // Check if adding from different restaurant
    if (cart.restaurantId && cart.restaurantId !== item.restaurantId && cart.items.length > 0) {
      // Clear cart
      cart.items = [];
    }
    
    cart.restaurantId = item.restaurantId;
    
    const existing = cart.items.find(i => i.menuItemId === item.id);
    if (existing) {
      existing.quantity += quantity;
      existing.subTotal = existing.quantity * existing.price;
    } else {
      cart.items.push({
        cartItemId: Date.now(),
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        subTotal: item.price * quantity
      });
    }
    
    return successResponse(cart, "Item added");
  },

  updateCartItem: async (cartItemId, quantity) => {
    await delay(300);
    const user = api._getCurrentUser();
    if (!user) throw errorResponse("Unauthorized", 401);
    const cart = getCartForUser(user.id);
    
    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.cartItemId !== cartItemId);
    } else {
      const existing = cart.items.find(i => i.cartItemId === cartItemId);
      if (existing) {
        existing.quantity = quantity;
        existing.subTotal = existing.quantity * existing.price;
      }
    }
    return successResponse(cart, "Cart updated");
  },

  clearCart: async () => {
    await delay(200);
    const user = api._getCurrentUser();
    if (!user) return successResponse(null);
    carts[user.id] = { restaurantId: null, items: [], totalAmount: 0, count: 0 };
    return successResponse(null);
  },

  // --- ORDERS --- //
  placeOrder: async ({ restaurantId, deliveryAddress, specialInstructions }) => {
    await delay(500);
    const user = api._getCurrentUser();
    if (!user) throw errorResponse("Unauthorized", 401);
    const cart = getCartForUser(user.id);
    if (!cart.items.length || cart.restaurantId !== parseInt(restaurantId)) {
      throw errorResponse("Cart empty or mismatch", 400);
    }

    const rest = restaurants.find(r => r.id === parseInt(restaurantId));
    
    const newOrder = {
      orderId: Date.now(),
      customerId: user.id,
      customerName: user.name,
      restaurantId: rest.id,
      restaurantName: rest.name,
      deliveryAddress,
      specialInstructions,
      status: "PLACED",
      items: [...cart.items],
      totalAmount: cart.totalAmount,
      placedAt: new Date().toISOString()
    };
    
    orders.unshift(newOrder);
    carts[user.id] = { restaurantId: null, items: [], totalAmount: 0, count: 0 };
    return successResponse(newOrder, "Order placed successfully");
  },

  getMyOrders: async () => {
    await delay(300);
    const user = api._getCurrentUser();
    if (!user) throw errorResponse("Unauthorized", 401);
    const myOrders = orders.filter(o => o.customerId === user.id);
    return successResponse(myOrders);
  },

  cancelOrder: async (orderId) => {
    await delay(300);
    const user = api._getCurrentUser();
    const order = orders.find(o => o.orderId === parseInt(orderId));
    if (!order) throw errorResponse("Not found", 404);
    if (order.customerId !== user.id) throw errorResponse("Forbidden", 403);
    if (order.status !== "PLACED") throw errorResponse("Cannot cancel", 400);
    
    order.status = "CANCELLED";
    order.cancelledAt = new Date().toISOString();
    return successResponse(order);
  },

  // --- ADMIN APIs --- //
  getAllOrders: async () => {
    await delay(400);
    return successResponse(orders);
  },
  
  updateOrderStatus: async (orderId, status) => {
    await delay(300);
    const order = orders.find(o => o.orderId === parseInt(orderId));
    if (!order) throw errorResponse("Not found", 404);
    order.status = status;
    return successResponse(order);
  }
};
