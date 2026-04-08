import React from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../../components/customer/RestaurantCard';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';
import restaurantService from '../../services/restaurantService';
import './CustomerPages.css';

const FoodOrdering = () => {
  const navigate = useNavigate();
  const { data: restaurants, loading, error } = useFetch(() => restaurantService.getAll());

  if (loading) return <Loader />;
  if (error) return <div className="page-container"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Restaurants</h1>
      {restaurants && restaurants.length > 0 ? (
        <div className="restaurant-grid">
          {restaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onClick={() => navigate(`/customer/menu/${r.id}`)}
            />
          ))}
        </div>
      ) : (
        <p>No restaurants available at the moment.</p>
      )}
    </div>
  );
};

export default FoodOrdering;
