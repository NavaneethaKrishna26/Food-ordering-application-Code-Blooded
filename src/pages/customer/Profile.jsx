import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/apiClient";
import { User, Mail, Phone, Edit2, Shield, AlertCircle, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, phone: user.phone || '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.updateProfile(formData);
      await refreshUser();
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 animate-fade-in max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <User className="text-primary" size={32} /> My Profile
        </h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn btn-outline flex items-center gap-2">
            <Edit2 size={16} /> Edit Profile
          </button>
        )}
      </div>

      {success && (
        <div className="mb-6 p-4 bg-success-color/10 border border-success-color rounded-md flex items-center gap-2 text-success-color animate-fade-in">
          <CheckCircle size={20} />
          <span className="text-sm font-medium">Profile updated successfully.</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-danger-color/10 border border-danger-color rounded-md flex items-center gap-2 text-danger-color animate-fade-in">
          <AlertCircle size={20} />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="card p-8">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <User size={18} />
                  </div>
                  <input type="text" name="name" className="input pl-10" value={formData.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <Phone size={18} />
                  </div>
                  <input type="tel" name="phone" className="input pl-10" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Email mapping (Readonly due to typical auth restrictions) */}
             <div className="input-group">
                <label className="input-label">Email Address (Cannot be changed)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <Mail size={18} />
                  </div>
                  <input type="email" className="input pl-10 opacity-50 cursor-not-allowed" value={user.email} disabled />
                </div>
              </div>

            <div className="flex gap-4 pt-4 border-t border-border-color">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost" disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex flex-col items-center justify-center text-primary text-3xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-sm text-text-muted mb-1">Full Name</p>
                  <p className="font-semibold text-lg">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><Mail size={14} /> Email Address</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><Phone size={14} /> Phone Number</p>
                  <p className="font-semibold">{user.phone || 'Not provided'}</p>
                </div>
                <div>
                   <p className="text-sm text-text-muted mb-1 flex items-center gap-2"><Shield size={14} /> Role</p>
                   <span className="badge bg-primary/10 text-primary">{user.role}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border-color">
              <p className="text-sm text-text-muted">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
