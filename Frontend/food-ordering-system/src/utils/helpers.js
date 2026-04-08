import { ORDER_STATUS } from './constants';

export const getStatusBadgeClass = (status) => {
  switch (status) {
    case ORDER_STATUS.PLACED: return 'badge badge-placed';
    case ORDER_STATUS.PREPARING: return 'badge badge-preparing';
    case ORDER_STATUS.OUT_FOR_DELIVERY: return 'badge badge-out-for-delivery';
    case ORDER_STATUS.DELIVERED: return 'badge badge-delivered';
    case ORDER_STATUS.CANCELLED: return 'badge badge-cancelled';
    default: return 'badge';
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'Something went wrong';
};
