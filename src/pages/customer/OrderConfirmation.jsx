import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { api } from '../../api/apiClient';
import { MapPin, FileText, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ deliveryAddress: '', specialInstructions: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);

  useEffect(() => {
    if (cart.items.length === 0 && !successOrder) {
      navigate('/cart');
    }
  }, [cart, navigate, successOrder]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        restaurantId: cart.restaurantId,
        ...formData
      };
      const res = await api.placeOrder(payload);
      await refreshCart();
      setSuccessOrder(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (successOrder) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-24 h-24 bg-success-color bg-opacity-20 rounded-full flex items-center justify-center text-success-color mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CheckCircle size={48} />
        </div>
        <h2 className="text-4xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="text-text-muted text-lg mb-8 max-w-md">Your order #{successOrder.orderId} from {successOrder.restaurantName} is now {successOrder.status.toLowerCase()}. You will receive your food shortly.</p>
        <div className="flex gap-4">
          <Link to="/orders" className="btn btn-primary">Track Order</Link>
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) return null;

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {error && (
            <div className="mb-6 p-4 bg-danger-color bg-opacity-10 border border-danger-color rounded-md text-danger-color text-sm">
              {error}
            </div>
          )}
          
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Delivery Details</h2>
            
            <div className="input-group">
              <label className="input-label">Delivery Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none text-text-muted">
                  <MapPin size={18} />
                </div>
                <textarea 
                  name="deliveryAddress" 
                  className="input pl-10 pt-3 min-h-[100px] resize-y" 
                  placeholder="Enter your full street address, apartment number, etc."
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group mt-6">
              <label className="input-label">Special Instructions (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none text-text-muted">
                  <FileText size={18} />
                </div>
                <textarea 
                  name="specialInstructions" 
                  className="input pl-10 pt-3 min-h-[80px] resize-y" 
                  placeholder="Extra spicy, leave at door, etc."
                  value={formData.specialInstructions}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>

        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="mb-4 max-h-[40vh] overflow-y-auto pr-2">
              {cart.items.map(item => (
                <div key={item.cartItemId} className="flex justify-between items-start mb-3 text-sm">
                  <div>
                    <span className="font-bold mr-2">{item.quantity}x</span>
                    <span className="text-text-muted">{item.name}</span>
                  </div>
                  <span className="font-medium whitespace-nowrap">₹{item.subTotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border-color my-4"></div>
            
            <div className="flex justify-between items-center mb-2 text-text-muted">
              <span>Subtotal</span>
              <span>₹{cart.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-text-muted">
              <span>Delivery Fee</span>
              <span>₹40.00</span>
            </div>
            
            <div className="border-t border-border-color my-4"></div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-2xl font-bold text-primary">₹{(cart.totalAmount + 40).toFixed(2)}</span>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              className="btn btn-primary w-full py-3 text-lg"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
