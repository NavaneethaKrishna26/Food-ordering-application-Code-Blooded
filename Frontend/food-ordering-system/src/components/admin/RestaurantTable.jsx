import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import Modal from '../common/Modal';
import './AdminComponents.css';

const RestaurantTable = ({ restaurants, onEdit, onDelete }) => {
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEditClick = (restaurant) => {
    setEditData({ ...restaurant });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editData.id, editData);
    setEditModal(false);
  };

  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.address}</td>
                <td>{r.phone}</td>
                <td>{r.isActive ? '✅' : '❌'}</td>
                <td>
                  <div className="table-actions">
                    <button className="btn btn-secondary btn-small" onClick={() => handleEditClick(r)}>Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => onDelete(r.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Restaurant">
        {editData && (
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={editData.name || ''} onChange={handleEditChange} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input name="description" value={editData.description || ''} onChange={handleEditChange} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input name="address" value={editData.address || ''} onChange={handleEditChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={editData.phone || ''} onChange={handleEditChange} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input name="imageUrl" value={editData.imageUrl || ''} onChange={handleEditChange} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Changes</button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default RestaurantTable;
