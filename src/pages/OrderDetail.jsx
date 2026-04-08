import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, Navigation, CheckCircle, XCircle } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.getMyOrders();
        // The mock API doesn't have a specific getOrderById for customers, so we filter from my orders:
        const found = res.data.find(o => o.orderId === parseInt(id));
        if (!found) {
          setError("Order not found");
        } else {
          setOrder(found);
        }
      } catch (err) {
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.cancelOrder(order.orderId);
      // Refresh
      const res = await api.getMyOrders();
      setOrder(res.data.find(o => o.orderId === order.orderId));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to cancel order');
    }
  };

  if (loading) {
     return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-10 text-center animate-fade-in">
        <div className="card p-12 max-w-lg mx-auto">
          <XCircle className="mx-auto text-danger-color mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-text-muted mb-6">{error}</p>
          <button onClick={() => navigate(-1)} className="btn btn-primary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.orderId}</h1>
          <p className="text-text-muted">Placed on {new Date(order.placedAt).toLocaleString()}</p>
        </div>
        <div className={`px-4 py-2 rounded-full font-bold text-sm ${order.status === 'DELIVERED' ? 'bg-success-color/20 text-success-color' : order.status === 'CANCELLED' ? 'bg-danger-color/20 text-danger-color' : 'bg-primary/20 text-primary'}`}>
          Status: {order.status.replace(/_/g, ' ')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Items Card */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-6 border-b border-border-color pb-4">Order Items from {order.restaurantName}</h2>
            
            <div className="flex flex-col gap-4">
              {order.items.map(item => (
                <div key={item.menuItemId} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{item.quantity}x</span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span className="font-medium">₹{item.subTotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border-color mt-6 pt-4 space-y-2">
               <div className="flex justify-between text-text-muted text-sm">
                 <span>Subtotal</span>
                 <span>₹{order.totalAmount.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-text-muted text-sm">
                 <span>Delivery Fee</span>
                 <span>₹40.00</span>
               </div>
               <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-border-color">
                 <span>Total Paid</span>
                 <span className="text-primary">₹{(order.totalAmount + 40).toFixed(2)}</span>
               </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="card p-6">
             <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
             <div className="space-y-4">
               <div>
                 <h4 className="text-sm font-semibold text-text-muted uppercase mb-1">Delivery Address</h4>
                 <p>{order.deliveryAddress}</p>
               </div>
               {order.specialInstructions && (
                 <div>
                   <h4 className="text-sm font-semibold text-text-muted uppercase mb-1">Special Instructions</h4>
                   <p className="bg-surface-hover p-3 rounded-md text-sm">{order.specialInstructions}</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div>
           {order.status === 'PLACED' && (
             <div className="card p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Actions</h3>
                <p className="text-sm text-text-muted mb-6">Since your order is still in the PLACED state, you are able to cancel it if you changed your mind.</p>
                <button onClick={handleCancel} className="btn btn-danger w-full flex items-center justify-center gap-2">
                  <XCircle size={18} /> Cancel Order
                </button>
             </div>
           )}
           {order.status === 'CANCELLED' && (
              <div className="card p-6 bg-danger-color/5 border-danger-color/20 text-center sticky top-24">
                 <XCircle className="mx-auto text-danger-color mb-3" size={32} />
                 <h3 className="font-bold text-danger-color mb-2">Order Cancelled</h3>
                 <p className="text-sm text-text-muted">This order was cancelled on {new Date(order.cancelledAt).toLocaleString()}.</p>
              </div>
           )}
           {order.status === 'DELIVERED' && (
              <div className="card p-6 bg-success-color/5 border-success-color/20 text-center sticky top-24">
                 <CheckCircle className="mx-auto text-success-color mb-3" size={32} />
                 <h3 className="font-bold text-success-color mb-2">Order Delivered</h3>
                 <p className="text-sm text-text-muted">Enjoy your meal! Delivered to your address successfully.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
