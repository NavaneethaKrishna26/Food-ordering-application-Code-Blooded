import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, ThumbsUp } from 'lucide-react';

export default function Landing() {
  return (
    <>
      <div className="container animate-fade-in">
        <div className="hero">
          
          <div className="hero-content">
            <h1 className="hero-title">
              Craving something <span>delicious?</span>
            </h1>
            <p className="hero-subtitle">
              Get your favorite meals from the best local restaurants delivered hot and fresh directly to your door in minutes.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Sign Up Now <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn btn-outline">
                Sign In
              </Link>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000" 
              alt="Delicious food" 
              className="hero-image"
            />
          </div>

        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="features-title">How it works</h2>
          
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon">
                <Utensils size={32} />
              </div>
              <h3>1. Choose Restaurant</h3>
              <p>Browse our extensive list of top rated local restaurants carefully curated for you.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                 <ThumbsUp size={32} />
              </div>
              <h3>2. Pick Your Meal</h3>
              <p>Select exactly what your heart and stomach desires from rich menus.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                 <Clock size={32} />
              </div>
              <h3>3. Fast Checkout</h3>
              <p>Place your order securely and track it right to your front door in minutes.</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
