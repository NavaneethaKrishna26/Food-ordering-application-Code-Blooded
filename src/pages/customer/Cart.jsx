import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, clearCart, loading } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-24 h-24 bg-surface-hover rounded-full flex flex-col items-center justify-center text-text-muted mb-6">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-text-muted mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Browse our restaurants and find something delicious!</p>
        <Link to="/" className="btn btn-primary">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.items.map(item => (
            <div key={item.cartItemId} className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-text-muted font-medium">₹{item.price}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-surface-hover rounded-md border border-border-color">
                  <button 
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-2 hover:text-primary transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 flex justify-center font-bold px-2 py-1">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-2 hover:text-primary transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="w-20 text-right font-bold flex justify-end">
                  ₹{item.subTotal.toFixed(2)}
                </div>

                <button 
                  onClick={() => updateQuantity(item.cartItemId, 0)}
                  className="p-2 text-text-muted hover:text-danger-color transition-colors"
                  title="Remove item"
                  disabled={loading}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-start mt-2">
            <button 
              onClick={clearCart} 
              className="btn btn-ghost text-danger-color hover:text-white"
              disabled={loading}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-text-muted">
              <span>Subtotal ({cart.itemCount} items)</span>
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
              onClick={() => navigate('/checkout')}
              className="btn btn-primary w-full flex justify-center items-center gap-2 py-3 text-lg"
              disabled={loading}
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
