import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import orderService from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';
import { getErrorMessage } from '../../utils/helpers';
import Loader from '../../components/common/Loader';
import './CustomerPages.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState('');

  const { cart, deliveryAddress, specialInstructions } = location.state || {};

  if (!cart) {
    return (
      <div className="page-container">
        <p>No order data. <button className="btn btn-primary" onClick={() => navigate('/customer/cart')}>Go to Cart</button></p>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError('');
    try {
      const res = await orderService.placeOrder({
        restaurantId: cart.restaurantId,
        deliveryAddress,
        specialInstructions,
      });
      setOrderResult(res.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setPlacing(false);
    }
  };

  if (orderResult) {
    return (
      <div className="page-container">
        <div className="order-success card">
          <h2>✅ Order Placed Successfully!</h2>
          <p><strong>Order ID:</strong> #{orderResult.orderId}</p>
          <p><strong>Status:</strong> {orderResult.status}</p>
          <p><strong>Total:</strong> {formatCurrency(orderResult.totalAmount)}</p>
          <p><strong>Delivery Address:</strong> {orderResult.deliveryAddress}</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/customer/orders')}>View Orders</button>
            <button className="btn btn-secondary" onClick={() => navigate('/customer/restaurants')}>Order More</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Confirm Your Order</h1>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="confirmation-card card">
        <h3>🍽️ {cart.restaurantName}</h3>
        <div className="confirmation-items">
          {cart.items.map((item) => (
            <div key={item.cartItemId} className="confirmation-item">
              <span>{item.name} × {item.quantity}</span>
              <span>{formatCurrency(item.subTotal)}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="confirmation-item confirmation-total">
          <span>Total</span>
          <span>{formatCurrency(cart.totalAmount)}</span>
        </div>
        <p style={{ marginTop: '12px' }}><strong>Deliver to:</strong> {deliveryAddress}</p>
        {specialInstructions && <p><strong>Instructions:</strong> {specialInstructions}</p>}

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '20px' }}
          onClick={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
