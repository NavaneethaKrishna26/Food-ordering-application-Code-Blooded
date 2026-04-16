import axiosInstance from './axiosInstance';

const cartService = {
  getCart: () => axiosInstance.get('/cart'),
  addItem: (data) => axiosInstance.post('/cart/items', data),
  updateItem: (cartItemId, data) => axiosInstance.put(`/cart/items/${cartItemId}`, data),
  removeItem: (cartItemId) => axiosInstance.delete(`/cart/items/${cartItemId}`),
  clearCart: () => axiosInstance.delete('/cart'),
};

export default cartService;
