import axiosInstance from './axiosInstance';

const orderService = {
  placeOrder: (data) => axiosInstance.post('/orders', data),
  getMyOrders: () => axiosInstance.get('/orders'),
  getOrderById: (orderId) => axiosInstance.get(`/orders/${orderId}`),
  cancelOrder: (orderId) => axiosInstance.patch(`/orders/${orderId}/cancel`),
};

export default orderService;
