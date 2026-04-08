import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from "../../api/apiClient";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { MapPin, Star, Plus, Info } from 'lucide-react';

export default function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart, cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [restRes, menuRes] = await Promise.all([
          api.getRestaurantById(id),
          api.getMenus(id)
        ]);
        setRestaurant(restRes.data);
        setMenus(menuRes.data);
      } catch (err) {
        setError('Failed to load menu details');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  const handleAdd = async (menuItem) => {
    if (!user) {
      if (window.confirm('Please login to add items to cart. Go to login page?')) {
        navigate('/login');
      }
      return;
    }
    if (user.role === 'ADMIN') {
      alert("Admins cannot place orders.");
      return;
    }

    if (cart.restaurantId && cart.restaurantId !== parseInt(id)) {
      if (!window.confirm("Your cart contains items from another restaurant. Do you want to clear the cart and add this item instead?")) {
        return;
      }
    }

    try {
      await addToCart(menuItem.id, 1);
      // Optional: Add a subtle toast or visual feedback instead of an alert
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !restaurant) {
    return <div className="container py-10 text-center text-danger-color">{error || 'Restaurant not found'}</div>;
  }

  return (
    <div className="container animate-fade-in">
      {/* Restaurant Header */}
      <div className="card mb-8 overflow-hidden">
        <div className="h-64 md:h-80 relative">
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-color to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{restaurant.name}</h1>
                <p className="text-text-muted text-lg mb-2">{restaurant.description}</p>
                <div className="flex items-center text-sm font-medium gap-6 text-white/80">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-warning-color fill-warning-color" />
                    <span>{restaurant.rating} Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">Menu Items</h2>
        {menus.length === 0 ? (
          <div className="p-8 text-center text-text-muted card">
            <Info className="mx-auto mb-2 opacity-50" size={32} />
            <p>No items currently available in this menu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((item, idx) => (
              <div key={item.id} className="card p-4 flex flex-col" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="h-40 relative rounded-md overflow-hidden mb-4">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <span className="font-semibold text-primary whitespace-nowrap">₹{item.price}</span>
                  </div>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                </div>
                <button 
                  onClick={() => handleAdd(item)}
                  className="btn btn-primary w-full mt-auto flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
