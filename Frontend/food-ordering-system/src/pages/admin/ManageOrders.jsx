import React, { useState } from 'react';
import OrderTable from '../../components/admin/OrderTable';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';
import adminService from '../../services/adminService';
import { getErrorMessage } from '../../utils/helpers';
import './AdminPages.css';

const ManageOrders = () => {
  const { data: orders, loading, error, refetch } = useFetch(() => adminService.getAllOrders());
  const [statusFilter, setStatusFilter] = useState('');

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, { status: newStatus });
      refetch();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <Loader />;

  const filteredOrders = statusFilter
    ? orders?.filter((o) => o.status === statusFilter)
    : orders;

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Orders</h1>

      <div className="form-group" style={{ maxWidth: '300px', marginBottom: '20px' }}>
        <label>Filter by Status</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="PLACED">Placed</option>
          <option value="PREPARING">Preparing</option>
          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <OrderTable orders={filteredOrders} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default ManageOrders;
