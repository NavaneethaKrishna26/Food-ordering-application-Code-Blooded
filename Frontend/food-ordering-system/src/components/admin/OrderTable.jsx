import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { getStatusBadgeClass, formatDate } from '../../utils/helpers';
import { ORDER_STATUS } from '../../utils/constants';
import './AdminComponents.css';

const OrderTable = ({ orders, onUpdateStatus }) => {
  const getNextStatus = (current) => {
    switch (current) {
      case ORDER_STATUS.PLACED: return ORDER_STATUS.PREPARING;
      case ORDER_STATUS.PREPARING: return ORDER_STATUS.OUT_FOR_DELIVERY;
      case ORDER_STATUS.OUT_FOR_DELIVERY: return ORDER_STATUS.DELIVERED;
      default: return null;
    }
  };

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Restaurant</th>
            <th>Total</th>
            <th>Status</th>
            <th>Placed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const next = getNextStatus(order.status);
            return (
              <tr key={order.orderId}>
                <td>#{order.orderId}</td>
                <td>{order.customerName || '-'}</td>
                <td>{order.restaurantName}</td>
                <td>{formatCurrency(order.totalAmount)}</td>
                <td>
                  <span className={getStatusBadgeClass(order.status)}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td>{formatDate(order.placedAt)}</td>
                <td>
                  {next && (
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => onUpdateStatus(order.orderId, next)}
                    >
                      → {next.replace(/_/g, ' ')}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
