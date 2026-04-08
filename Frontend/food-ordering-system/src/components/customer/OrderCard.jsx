import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { getStatusBadgeClass, formatDate } from '../../utils/helpers';
import './CustomerComponents.css';

const OrderCard = ({ order, onCancel, onViewDetails }) => {
  return (
    <div className="order-card card">
      <div className="order-card-header">
        <div>
          <h4>Order #{order.orderId}</h4>
          <p className="order-restaurant">{order.restaurantName}</p>
        </div>
        <span className={getStatusBadgeClass(order.status)}>{order.status.replace(/_/g, ' ')}</span>
      </div>
      <div className="order-card-body">
        <p><strong>Total:</strong> {formatCurrency(order.totalAmount)}</p>
        <p><strong>Placed:</strong> {formatDate(order.placedAt)}</p>
        {order.deliveredAt && <p><strong>Delivered:</strong> {formatDate(order.deliveredAt)}</p>}
      </div>
      <div className="order-card-actions">
        {onViewDetails && (
          <button className="btn btn-secondary btn-small" onClick={() => onViewDetails(order.orderId)}>
            View Details
          </button>
        )}
        {order.status === 'PLACED' && onCancel && (
          <button className="btn btn-danger btn-small" onClick={() => onCancel(order.orderId)}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
