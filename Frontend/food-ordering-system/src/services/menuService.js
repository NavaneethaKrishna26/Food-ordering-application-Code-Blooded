import axiosInstance from './axiosInstance';

const menuService = {
  getByRestaurant: (restaurantId) => axiosInstance.get(`/menus/${restaurantId}`),
  getItemById: (itemId) => axiosInstance.get(`/menus/items/${itemId}`),
};

export default menuService;
