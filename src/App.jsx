import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-sage-100 font-sans text-text-main">
            <AppRoutes />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
