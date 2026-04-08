import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './PublicPages.css';

const Home = () => {
  const { isAuthenticated, isAdmin, isCustomer } = useAuth();

  const getStartLink = () => {
    if (!isAuthenticated) return '/login';
    if (isAdmin) return '/admin/dashboard';
    return '/customer/restaurants';
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Delicious Food, Delivered to You</h1>
          <p>Browse restaurants, pick your favorites, and order with ease.</p>
          <Link to={getStartLink()} className="btn btn-primary hero-btn">
            Start Ordering →
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card card">
              <h3>Browse Restaurants</h3>
              <p>Explore a variety of restaurants and cuisines near you.</p>
            </div>
            <div className="feature-card card">
              <h3>Easy Ordering</h3>
              <p>Add items to your cart and place orders in seconds.</p>
            </div>
            <div className="feature-card card">
              <h3>Track & Enjoy</h3>
              <p>Track your order status and enjoy your meal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
