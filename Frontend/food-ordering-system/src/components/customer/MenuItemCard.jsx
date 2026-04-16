import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import './CustomerComponents.css';

const MenuItemCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await onAddToCart(item.id, quantity);
      setQuantity(1);
    } catch (err) {
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="menu-item-card card">
      <div className="menu-item-img">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <div className="menu-item-placeholder">🍕</div>
        )}
      </div>
      <div className="menu-item-body">
        <h4>{item.name}</h4>
        <p className="menu-item-desc">{item.description}</p>
        <p className="menu-item-category">{item.category}</p>
        <p className="menu-item-price">{formatCurrency(item.price)}</p>
        {!item.isAvailable ? (
          <span className="menu-item-unavailable">Unavailable</span>
        ) : (
          <div className="menu-item-actions">
            <div className="qty-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn btn-primary btn-small" onClick={handleAdd} disabled={adding}>
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
