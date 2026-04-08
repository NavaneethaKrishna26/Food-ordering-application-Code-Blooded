import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { getErrorMessage } from '../../utils/helpers';

const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="reg-name">Full Name</label>
        <input
          id="reg-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Min 8 chars, include letter + number"
          minLength={8}
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-phone">Phone (Optional)</label>
        <input
          id="reg-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Registering...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default RegisterForm;
