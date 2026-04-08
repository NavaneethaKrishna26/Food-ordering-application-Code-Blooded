import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from "../../api/apiClient";
import { Clock, Navigation, CheckCircle, XCircle } from 'lucide-react';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'PLACED': return <Clock size={16} />;
    case 'PREPARING': return <div className="animate-spin h-4 w-4 border-2 border-warning-color border-t-transparent rounded-full" />;
    case 'OUT_FOR_DELIVERY': return <Navigation size={16} />;
    case 'DELIVERED': return <CheckCircle size={16} />;
    case 'CANCELLED': return <XCircle size={16} />;
    default: return <Clock size={16} />;
  }
};

const StatusBadge = ({ status }) => {
  let badgeClass = 'badge ';
  switch (status) {
    case 'PLACED': badgeClass += 'bg-blue-500/10 text-blue-500'; break;
    case 'PREPARING': badgeClass += 'badge-warning'; break;
    case 'OUT_FOR_DELIVERY': badgeClass += 'bg-purple-500/10 text-purple-500'; break;
    case 'DELIVERED': badgeClass += 'badge-success'; break;
    case 'CANCELLED': badgeClass += 'badge-danger'; break;
    default: badgeClass += 'bg-gray-500/10 text-gray-500'; break;
  }
  return (
    <span className={`${badgeClass} flex items-center gap-1`}>
      <StatusIcon status={status} />
      {status.replace(/_/g, ' ')}
    </span>
  );
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.getMyOrders();
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.cancelOrder(orderId);
      // Refresh
      const res = await api.getMyOrders();
      setOrders(res.data);
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

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="card p-12 text-center text-text-muted">
          <p className="text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map(order => (
            <div key={order.orderId} className="card p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{order.restaurantName}</h3>
                    <p className="text-text-muted text-sm">Order #{order.orderId} • {new Date(order.placedAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary mb-2">₹{order.totalAmount.toFixed(2)}</div>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
                
                <div className="bg-surface-hover rounded-md p-4 mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-text-muted uppercase tracking-wider">Items</h4>
                  {order.items.map(item => (
                    <div key={item.menuItemId} className="flex justify-between text-sm mb-1">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-medium text-text-muted">₹{item.subTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="text-sm text-text-muted">
                  <span className="font-semibold text-text-main">Deliver to: </span>
                  {order.deliveryAddress}
                </div>
              </div>
              
              <div className="md:w-48 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border-color pt-4 md:pt-0 md:pl-6">
                <Link to={`/orders/${order.orderId}`} className="btn btn-outline w-full mb-3">View Details</Link>
                {order.status === 'PLACED' && (
                  <button 
                    onClick={() => handleCancel(order.orderId)}
                    className="btn btn-danger w-full"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
