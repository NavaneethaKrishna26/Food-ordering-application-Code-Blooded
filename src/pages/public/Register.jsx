import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card">
        <div className="auth-title">
          <h1>Create Account</h1>
          <p>Join us to start ordering</p>
        </div>

        {error && (
          <div className="alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <div className="input-with-icon">
              <span className="input-icon"><User size={18} /></span>
              <input type="text" name="name" className="input" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-with-icon">
              <span className="input-icon"><Mail size={18} /></span>
              <input type="email" name="email" className="input" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number (Optional)</label>
            <div className="input-with-icon">
              <span className="input-icon"><Phone size={18} /></span>
              <input type="tel" name="phone" className="input" placeholder="9876543210" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label className="input-label">Password</label>
            <div className="input-with-icon">
              <span className="input-icon"><Lock size={18} /></span>
              <input type="password" name="password" className="input" placeholder="Min 8 characters" value={formData.password} onChange={handleChange} required minLength={8} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
