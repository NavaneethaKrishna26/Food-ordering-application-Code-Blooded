import axiosInstance from './axiosInstance';

const restaurantService = {
  getAll: () => axiosInstance.get('/restaurants'),
  getById: (id) => axiosInstance.get(`/restaurants/${id}`),
};

export default restaurantService;
