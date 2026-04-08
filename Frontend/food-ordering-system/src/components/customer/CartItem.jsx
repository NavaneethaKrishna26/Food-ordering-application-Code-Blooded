import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import './CustomerComponents.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p className="cart-item-price">{formatCurrency(item.price)} each</p>
      </div>
      <div className="cart-item-controls">
        <div className="qty-control">
          <button onClick={() => onUpdateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
        </div>
        <span className="cart-item-subtotal">{formatCurrency(item.subTotal)}</span>
        <button className="btn btn-danger btn-small" onClick={() => onRemove(item.cartItemId)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
