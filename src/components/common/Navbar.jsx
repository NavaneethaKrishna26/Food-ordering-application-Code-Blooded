import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, User, LogOut, LayoutDashboard, Utensils } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="nav-header">
      <div className="container flex justify-between items-center">
        <Link to="/" className="logo">
          <Utensils className="text-primary" size={28} />
          <span>Foody</span>
        </Link>

        <nav className="flex items-center gap-6">
          {!isAdmin && <Link to="/" className="font-medium hover:text-primary transition-colors">Restaurants</Link>}
          
          {isAdmin && (
            <>
              <Link to="/admin" className="font-medium hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/admin/orders" className="font-medium hover:text-primary transition-colors">Orders</Link>
            </>
          )}

          {user && !isAdmin && (
            <Link to="/orders" className="font-medium hover:text-primary transition-colors">My Orders</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          ) : (
            <>
              {!isAdmin && (
                <Link to="/cart" className="relative p-2 text-text-muted hover:text-primary transition-colors">
                  <ShoppingBag size={24} />
                  {cart.itemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                      {cart.itemCount}
                    </span>
                  )}
                </Link>
              )}
              
              <div className="flex items-center gap-2 border-l border-border-color pl-4 ml-2">
                <Link to="/profile" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium hidden md:block text-text-main group-hover:text-primary transition-colors">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-text-muted hover:text-danger-color p-2 ml-2 transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
