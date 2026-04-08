import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import Modal from '../common/Modal';
import './AdminComponents.css';

const MenuTable = ({ items, onEdit, onDelete }) => {
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEditClick = (item) => {
    setEditData({ ...item });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editData.id, editData);
    setEditModal(false);
  };

  if (!items || items.length === 0) {
    return <p>No menu items found. Add one above.</p>;
  }

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category || '-'}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.isAvailable ? '✅' : '❌'}</td>
                <td>
                  <div className="table-actions">
                    <button className="btn btn-secondary btn-small" onClick={() => handleEditClick(item)}>Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => onDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Menu Item">
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
              <label>Price (₹)</label>
              <input name="price" type="number" step="0.01" value={editData.price || ''} onChange={handleEditChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input name="category" value={editData.category || ''} onChange={handleEditChange} />
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

export default MenuTable;
