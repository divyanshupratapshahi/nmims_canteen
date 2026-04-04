
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MenuItem, CartItem, Order, TableBooking } from './types';
import { INITIAL_MENU } from './constants';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import { ShoppingCart, Menu as MenuIcon, X, LayoutDashboard, UtensilsCrossed } from 'lucide-react';

// --- Context for State Management ---
interface AppState {
  menu: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  bookings: TableBooking[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
  bookTable: (booking: Omit<TableBooking, 'id' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  updateBookingStatus: (id: string, status: TableBooking['status']) => void;
  deleteMenuItem: (id: string) => void;
  addMenuItem: (item: MenuItem) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const readStoredState = <T,>(key: string, fallback: T): T => {
  const savedValue = localStorage.getItem(key);
  if (!savedValue) return fallback;

  try {
    return JSON.parse(savedValue) as T;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- Main App Component ---
export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>(() => readStoredState('nmims_menu', INITIAL_MENU));
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => readStoredState('nmims_orders', []));
  const [bookings, setBookings] = useState<TableBooking[]>(() => readStoredState('nmims_bookings', []));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nmims_menu', JSON.stringify(menu));
    localStorage.setItem('nmims_orders', JSON.stringify(orders));
    localStorage.setItem('nmims_bookings', JSON.stringify(bookings));
  }, [menu, orders, bookings]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const bookTable = (bookingData: Omit<TableBooking, 'id' | 'status'>) => {
    const newBooking: TableBooking = {
      ...bookingData,
      id: `BK-${Date.now()}`,
      status: 'Confirmed',
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const updateBookingStatus = (id: string, status: TableBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteMenuItem = (id: string) => {
    setMenu(prev => prev.filter(m => m.id !== id));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenu(prev => [...prev, item]);
  };

  return (
    <AppContext.Provider value={{ 
      menu, cart, orders, bookings, 
      addToCart, removeFromCart, updateCartQuantity, clearCart, 
      placeOrder, bookTable, updateOrderStatus, updateBookingStatus,
      deleteMenuItem, addMenuItem
    }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-black/95 border-b border-red-900/30 sticky top-0 z-50 backdrop-blur-sm">
            <nav className="site-container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-lg">
                    <UtensilsCrossed size={24} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white leading-none">NMIMS</span>
                    <span className="text-xs text-red-500 font-semibold uppercase tracking-wider">Navi Mumbai Canteen</span>
                  </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link to="/menu" className="text-gray-300 hover:text-red-500 font-medium transition-colors">Menu</Link>
                  <Link to="/booking" className="text-gray-300 hover:text-red-500 font-medium transition-colors">Book Table</Link>
                  <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
                    <LayoutDashboard size={20} />
                  </Link>
                  <Link to="/cart" className="relative p-2 text-gray-300 hover:text-red-500 transition-colors">
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-black">
                        {cart.reduce((acc, i) => acc + i.quantity, 0)}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-gray-300 hover:text-white p-2"
                >
                  {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                </button>
              </div>
            </nav>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-zinc-900 border-t border-zinc-800 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-300">
                <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-gray-200">View Menu</Link>
                <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-gray-200">Book a Table</Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-gray-200 flex items-center">
                  Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)})
                </Link>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-gray-400">Admin Panel</Link>
              </div>
            )}
          </header>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <footer className="bg-black border-t border-zinc-900 py-12">
            <div className="site-container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <UtensilsCrossed size={20} className="text-red-500" />
                    <span className="text-xl font-bold">NMIMS Canteen</span>
                  </div>
                  <p className="text-zinc-500 max-w-sm mb-4">
                    Premium hospitality services by SukhSagar Hospitality Services. 
                    Fresh food, hygienic preparation, and student-friendly prices.
                  </p>
                  <p className="text-zinc-400 text-sm">Navi Mumbai, Maharashtra, India</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
                  <ul className="space-y-2 text-zinc-500">
                    <li><Link to="/menu" className="hover:text-red-500 transition-colors">Menu</Link></li>
                    <li><Link to="/booking" className="hover:text-red-500 transition-colors">Book a Table</Link></li>
                    <li><Link to="/cart" className="hover:text-red-500 transition-colors">Your Cart</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
                  <ul className="space-y-2 text-zinc-500">
                    <li><span className="hover:text-red-500 transition-colors">Terms of Service</span></li>
                    <li><span className="hover:text-red-500 transition-colors">Privacy Policy</span></li>
                    <li><span className="hover:text-red-500 transition-colors">Refund Policy</span></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
                &copy; {new Date().getFullYear()} NMIMS Navi Mumbai Canteen. All rights reserved. | Developed by Divyanshu Shahi
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
}
