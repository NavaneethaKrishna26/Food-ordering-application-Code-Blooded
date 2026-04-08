import React from 'react';
import useAuth from '../../hooks/useAuth';
import { formatDate } from '../../utils/helpers';
import './AdminPages.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Profile</h1>
      <div className="profile-card card">
        <div className="profile-info">
          <div className="profile-avatar">👤</div>
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            {user?.phone && <p>📞 {user.phone}</p>}
            <p className="profile-role">ADMIN</p>
            {user?.createdAt && <p className="profile-date">Member since {formatDate(user.createdAt)}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
