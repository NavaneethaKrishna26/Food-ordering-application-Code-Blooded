import React, { useState } from 'react';
import MenuTable from '../../components/admin/MenuTable';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';
import restaurantService from '../../services/restaurantService';
import menuService from '../../services/menuService';
import adminService from '../../services/adminService';
import { getErrorMessage } from '../../utils/helpers';
import './AdminPages.css';

const ManageMenu = () => {
  const { data: restaurants } = useFetch(() => restaurantService.getAll());
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [menuItems, setMenuItems] = useState(null);
  const [menuLoading, setMenuLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', imageUrl: '' });
  const [formError, setFormError] = useState('');

  const loadMenu = async (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    if (!restaurantId) {
      setMenuItems(null);
      return;
    }
    setMenuLoading(true);
    try {
      const res = await menuService.getByRestaurant(restaurantId);
      setMenuItems(res.data.data);
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setMenuLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await adminService.addMenuItem(selectedRestaurant, {
        ...form,
        price: parseFloat(form.price),
      });
      setAddModal(false);
      setForm({ name: '', description: '', price: '', category: '', imageUrl: '' });
      loadMenu(selectedRestaurant);
    } catch (err) {
      setFormError(getErrorMessage(err));
    }
  };

  const handleEdit = async (itemId, data) => {
    try {
      await adminService.updateMenuItem(itemId, data);
      loadMenu(selectedRestaurant);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await adminService.deleteMenuItem(itemId);
      loadMenu(selectedRestaurant);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Menu</h1>

      <div className="form-group" style={{ maxWidth: '400px' }}>
        <label>Select Restaurant</label>
        <select value={selectedRestaurant} onChange={(e) => loadMenu(e.target.value)}>
          <option value="">-- Select --</option>
          {restaurants && restaurants.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      {selectedRestaurant && (
        <div style={{ marginBottom: '16px' }}>
          <button className="btn btn-primary" onClick={() => setAddModal(true)}>+ Add Menu Item</button>
        </div>
      )}

      {menuLoading && <Loader />}
      {menuItems && <MenuTable items={menuItems} onEdit={handleEdit} onDelete={handleDelete} />}

      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add Menu Item">
        <form onSubmit={handleAdd}>
          {formError && <div className="alert alert-error">{formError}</div>}
          <div className="form-group">
            <label>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Price (₹) *</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input name="category" value={form.category} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Item</button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageMenu;
