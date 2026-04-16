import axiosInstance from './axiosInstance';

const adminService = {
  // Restaurants
  addRestaurant: (data) => axiosInstance.post('/admin/restaurants', data),
  updateRestaurant: (id, data) => axiosInstance.put(`/admin/restaurants/${id}`, data),
  deleteRestaurant: (id) => axiosInstance.delete(`/admin/restaurants/${id}`),

  // Menu Items
  addMenuItem: (restaurantId, data) => axiosInstance.post(`/admin/menus/${restaurantId}`, data),
  updateMenuItem: (itemId, data) => axiosInstance.put(`/admin/menus/items/${itemId}`, data),
  deleteMenuItem: (itemId) => axiosInstance.delete(`/admin/menus/items/${itemId}`),

  // Orders
  getAllOrders: (params) => axiosInstance.get('/admin/orders', { params }),
  getOrderById: (orderId) => axiosInstance.get(`/admin/orders/${orderId}`),
  updateOrderStatus: (orderId, data) => axiosInstance.patch(`/admin/orders/${orderId}/status`, data),

  // Users
  getAllUsers: () => axiosInstance.get('/admin/users'),
  getUserById: (userId) => axiosInstance.get(`/admin/users/${userId}`),
};

export default adminService;
