import React from 'react';
import { useParams } from 'react-router-dom';
import MenuItemCard from '../../components/customer/MenuItemCard';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';
import menuService from '../../services/menuService';
import restaurantService from '../../services/restaurantService';
import useCart from '../../hooks/useCart';
import './CustomerPages.css';

const Menu = () => {
  const { restaurantId } = useParams();
  const { data: restaurant } = useFetch(() => restaurantService.getById(restaurantId), [restaurantId]);
  const { data: menuItems, loading, error } = useFetch(() => menuService.getByRestaurant(restaurantId), [restaurantId]);
  const { addItem } = useCart();

  const handleAddToCart = async (menuItemId, quantity) => {
    await addItem(menuItemId, quantity);
    alert('Added to cart!');
  };

  if (loading) return <Loader />;
  if (error) return <div className="page-container"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page-container">
      <h1 className="page-title">{restaurant?.name || 'Menu'}</h1>
      {restaurant?.description && <p className="menu-restaurant-desc">{restaurant.description}</p>}

      {menuItems && menuItems.length > 0 ? (
        <div className="menu-list">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      ) : (
        <p>No menu items available.</p>
      )}
    </div>
  );
};

export default Menu;
