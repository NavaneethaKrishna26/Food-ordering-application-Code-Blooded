import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import './PublicPages.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    alert('Registration successful! Please sign in.');
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h2>Sign Up</h2>
        <RegisterForm onSuccess={handleSuccess} />
        <p className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
