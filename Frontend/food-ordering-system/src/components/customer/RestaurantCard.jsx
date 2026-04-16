import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import './CustomerComponents.css';

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div className="restaurant-card card" onClick={onClick}>
      <div className="restaurant-card-img">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} />
        ) : (
          <div className="restaurant-card-placeholder">🍽️</div>
        )}
      </div>
      <div className="restaurant-card-body">
        <h3>{restaurant.name}</h3>
        <p className="restaurant-desc">{restaurant.description || 'Delicious food awaits!'}</p>
        <p className="restaurant-address">📍 {restaurant.address}</p>
        {restaurant.rating && (
          <span className="restaurant-rating">⭐ {restaurant.rating}</span>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
