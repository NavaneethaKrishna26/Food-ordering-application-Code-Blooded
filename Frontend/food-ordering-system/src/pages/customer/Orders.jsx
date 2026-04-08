import React from 'react';
import OrderCard from '../../components/customer/OrderCard';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';
import orderService from '../../services/orderService';
import { getErrorMessage } from '../../utils/helpers';
import './CustomerPages.css';

const Orders = () => {
  const { data: orders, loading, error, refetch } = useFetch(() => orderService.getMyOrders());

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await orderService.cancelOrder(orderId);
      refetch();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="page-container"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page-container">
      <h1 className="page-title">My Orders</h1>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order.orderId} order={order} onCancel={handleCancel} />
        ))
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
