import React from 'react';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import orderService from '../../services/orderService';
import { formatDate } from '../../utils/helpers';
import Loader from '../../components/common/Loader';
import OrderCard from '../../components/customer/OrderCard';
import './CustomerPages.css';

const Profile = () => {
  const { user } = useAuth();
  const { data: orders, loading } = useFetch(() => orderService.getMyOrders());

  return (
    <div className="page-container">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-card card">
        <div className="profile-info">
          <div className="profile-avatar">👤</div>
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            {user?.phone && <p>📞 {user.phone}</p>}
            <p className="profile-role">{user?.role}</p>
            {user?.createdAt && <p className="profile-date">Member since {formatDate(user.createdAt)}</p>}
          </div>
        </div>
      </div>

      <h2 className="page-title" style={{ marginTop: '32px' }}>Order History</h2>
      {loading ? (
        <Loader />
      ) : orders && orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.orderId} order={order} />)
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default Profile;
