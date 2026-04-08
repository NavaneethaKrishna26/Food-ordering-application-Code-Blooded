import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/customer/CartItem';
import Loader from '../../components/common/Loader';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import './CustomerPages.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, error, fetchCart, updateItem, removeItem, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="page-container"><div className="alert alert-error">{error}</div></div>;

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  const handleProceed = () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address.');
      return;
    }
    navigate('/customer/order-confirmation', {
      state: {
        cart,
        deliveryAddress,
        specialInstructions,
      },
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Your Cart</h1>

      {isEmpty ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="btn btn-primary" onClick={() => navigate('/customer/restaurants')}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            <h3>Items from {cart.restaurantName}</h3>
            {cart.items.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                onUpdateQuantity={updateItem}
                onRemove={removeItem}
              />
            ))}
            <button className="btn btn-secondary btn-small" onClick={clearCart} style={{ marginTop: '12px' }}>
              Clear Cart
            </button>
          </div>

          <div className="cart-summary card">
            <h3>Order Summary</h3>
            <div className="cart-summary-row">
              <span>Items ({cart.itemCount})</span>
              <span>{formatCurrency(cart.totalAmount)}</span>
            </div>
            <hr />
            <div className="cart-summary-row cart-total">
              <span>Total</span>
              <span>{formatCurrency(cart.totalAmount)}</span>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Delivery Address *</label>
              <input
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
                required
              />
            </div>
            <div className="form-group">
              <label>Special Instructions</label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests?"
                rows={2}
              />
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleProceed}>
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
