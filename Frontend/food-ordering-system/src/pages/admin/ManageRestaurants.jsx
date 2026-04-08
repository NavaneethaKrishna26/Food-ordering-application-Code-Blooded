import React, { useState } from 'react';
import RestaurantTable from '../../components/admin/RestaurantTable';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';
import restaurantService from '../../services/restaurantService';
import adminService from '../../services/adminService';
import { getErrorMessage } from '../../utils/helpers';
import './AdminPages.css';

const ManageRestaurants = () => {
  const { data: restaurants, loading, error, refetch } = useFetch(() => restaurantService.getAll());
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', address: '', phone: '', imageUrl: '' });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await adminService.addRestaurant(form);
      setAddModal(false);
      setForm({ name: '', description: '', address: '', phone: '', imageUrl: '' });
      refetch();
    } catch (err) {
      setFormError(getErrorMessage(err));
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await adminService.updateRestaurant(id, data);
      refetch();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this restaurant?')) return;
    try {
      await adminService.deleteRestaurant(id);
      refetch();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Manage Restaurants</h1>
        <button className="btn btn-primary" onClick={() => setAddModal(true)}>+ Add Restaurant</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <RestaurantTable restaurants={restaurants} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add Restaurant">
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
            <label>Address *</label>
            <input name="address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Restaurant</button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageRestaurants;
