import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from "../../api/apiClient";
import { MapPin, Star, Clock } from 'lucide-react';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.getRestaurants();
        setRestaurants(res.data.filter(r => r.isActive));
      } catch (err) {
        console.error("Failed to load restaurants", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-10 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the best food & drinks</h1>
        <p className="text-text-muted text-lg">Order from your favorite local restaurants with ease.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, idx) => (
          <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="card group" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={restaurant.imageUrl} 
                alt={restaurant.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-surface-color text-text-main px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold shadow-md">
                <Star size={14} className="text-warning-color fill-warning-color" />
                {restaurant.rating}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{restaurant.name}</h3>
              <p className="text-text-muted text-sm mb-4 line-clamp-1">{restaurant.description}</p>
              
              <div className="flex items-center text-sm text-text-muted gap-4">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span className="truncate">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Clock size={16} />
                  <span>30-40 min</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {restaurants.length === 0 && (
        <div className="text-center text-text-muted py-10">
          <p>No restaurants available right now.</p>
        </div>
      )}
    </div>
  );
}
