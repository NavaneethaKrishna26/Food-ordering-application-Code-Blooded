import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import useAuth from '../../hooks/useAuth';
import './PublicPages.css';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated) {
    if (isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      navigate('/customer/restaurants', { replace: true });
    }
    return null;
  }

  const handleSuccess = (user) => {
    if (user.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/customer/restaurants');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h2>Sign In</h2>
        <LoginForm onSuccess={handleSuccess} />
        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
