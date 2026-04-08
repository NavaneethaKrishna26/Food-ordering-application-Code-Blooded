import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AdminPages.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Dashboard</h1>
      <p style={{ marginBottom: '24px' }}>Welcome, <strong>{user?.name}</strong></p>

      <div className="dashboard-grid">
        <Link to="/admin/restaurants" className="dashboard-card card">
          <span className="dashboard-icon">🏪</span>
          <h3>Manage Restaurants</h3>
          <p>Add, edit, or remove restaurants</p>
        </Link>

        <Link to="/admin/menu" className="dashboard-card card">
          <span className="dashboard-icon">📋</span>
          <h3>Manage Menu</h3>
          <p>Manage food items per restaurant</p>
        </Link>

        <Link to="/admin/orders" className="dashboard-card card">
          <span className="dashboard-icon">📦</span>
          <h3>Manage Orders</h3>
          <p>View and update order statuses</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
