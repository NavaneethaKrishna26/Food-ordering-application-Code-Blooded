import { useEffect, useState } from 'react';
import { api } from '../../api/apiClient';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.getAllOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // In a real app, you might poll or use websockets here
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="bg-surface-color px-4 py-2 rounded-md border border-border-color">
          <span className="text-text-muted text-sm mr-2">Total Orders:</span>
          <span className="font-bold text-primary">{orders.length}</span>
        </div>
      </div>
      
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-hover border-b border-border-color text-text-muted text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Restaurant</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-text-muted">No orders found.</td>
                </tr>
              ) : (
                orders.map(order => (
                   <tr key={order.orderId} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="p-4 font-medium">#{order.orderId}</td>
                    <td className="p-4">
                      <div>{order.customerName}</div>
                      <div className="text-xs text-text-muted truncate max-w-[150px]">{order.deliveryAddress}</div>
                    </td>
                    <td className="p-4">{order.restaurantName}</td>
                    <td className="p-4 font-bold text-primary">₹{order.totalAmount.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`badge ${order.status === 'DELIVERED' ? 'badge-success' : order.status === 'CANCELLED' ? 'badge-danger' : order.status === 'PLACED' ? 'bg-blue-500/10 text-blue-500' : 'badge-warning'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                        <select 
                          className="input py-1 px-2 text-sm max-w-[140px]"
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
                        >
                          <option value="PLACED">PLACED</option>
                          <option value="PREPARING">PREPARING</option>
                          <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
