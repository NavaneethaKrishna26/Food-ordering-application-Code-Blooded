import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

// Customer Pages
import FoodOrdering from '../pages/customer/FoodOrdering';
import Menu from '../pages/customer/Menu';
import Cart from '../pages/customer/Cart';
import OrderConfirmation from '../pages/customer/OrderConfirmation';
import Orders from '../pages/customer/Orders';
import CustomerProfile from '../pages/customer/Profile';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import ManageRestaurants from '../pages/admin/ManageRestaurants';
import ManageMenu from '../pages/admin/ManageMenu';
import ManageOrders from '../pages/admin/ManageOrders';
import AdminProfile from '../pages/admin/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Customer Routes */}
      <Route element={<CustomerLayout />}>
        <Route path="/customer/restaurants" element={
          <RoleBasedRoute role="CUSTOMER"><FoodOrdering /></RoleBasedRoute>
        } />
        <Route path="/customer/menu/:restaurantId" element={
          <RoleBasedRoute role="CUSTOMER"><Menu /></RoleBasedRoute>
        } />
        <Route path="/customer/cart" element={
          <RoleBasedRoute role="CUSTOMER"><Cart /></RoleBasedRoute>
        } />
        <Route path="/customer/order-confirmation" element={
          <RoleBasedRoute role="CUSTOMER"><OrderConfirmation /></RoleBasedRoute>
        } />
        <Route path="/customer/orders" element={
          <RoleBasedRoute role="CUSTOMER"><Orders /></RoleBasedRoute>
        } />
        <Route path="/customer/profile" element={
          <RoleBasedRoute role="CUSTOMER"><CustomerProfile /></RoleBasedRoute>
        } />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={
          <RoleBasedRoute role="ADMIN"><Dashboard /></RoleBasedRoute>
        } />
        <Route path="/admin/restaurants" element={
          <RoleBasedRoute role="ADMIN"><ManageRestaurants /></RoleBasedRoute>
        } />
        <Route path="/admin/menu" element={
          <RoleBasedRoute role="ADMIN"><ManageMenu /></RoleBasedRoute>
        } />
        <Route path="/admin/orders" element={
          <RoleBasedRoute role="ADMIN"><ManageOrders /></RoleBasedRoute>
        } />
        <Route path="/admin/profile" element={
          <RoleBasedRoute role="ADMIN"><AdminProfile /></RoleBasedRoute>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
