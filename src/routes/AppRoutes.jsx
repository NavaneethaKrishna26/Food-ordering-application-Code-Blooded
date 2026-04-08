import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

// Public Pages
import Home from '../pages/public/Home'; // Landing Page
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

// Customer Pages
import FoodOrdering from '../pages/customer/FoodOrdering'; // Restaurant Listing
import Menu from '../pages/customer/Menu';
import Cart from '../pages/customer/Cart';
import Profile from '../pages/customer/Profile';
import Orders from '../pages/customer/Orders';
import OrderConfirmation from '../pages/customer/OrderConfirmation';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';

export default function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-sage-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/food" replace /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/food" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/food" replace /> : <Register />} />
        
        {/* Customer Protected Routes */}
        <Route path="/food" element={<ProtectedRoute><FoodOrdering /></ProtectedRoute>} />
        <Route path="/restaurants/:id" element={<Menu />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Admin Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
