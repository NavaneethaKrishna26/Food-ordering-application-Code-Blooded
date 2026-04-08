import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, isAdmin, isCustomer, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">🍽️ FoodApp</Link>

        <div className="navbar-actions">
          {/* Cart - only for logged-in customers */}
          {isAuthenticated && isCustomer && (
            <Link to="/customer/cart" className="navbar-cart" title="Cart">
              🛒 Cart
            </Link>
          )}

          {/* Profile Dropdown */}
          <div className="navbar-profile" ref={dropdownRef}>
            <button
              className="navbar-profile-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              👤 {isAuthenticated ? user?.name?.split(' ')[0] : 'Account'} ▾
            </button>

            {dropdownOpen && (
              <div className="navbar-dropdown">
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Sign In
                    </Link>
                    <Link to="/register" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    {isCustomer && (
                      <Link to="/customer/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        My Profile
                      </Link>
                    )}
                    {isAdmin && (
                      <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Dashboard
                      </Link>
                    )}
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
