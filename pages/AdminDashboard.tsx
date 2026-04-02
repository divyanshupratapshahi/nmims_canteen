
import React, { useState } from 'react';
import { useApp } from '../App';
import { DEFAULT_MENU_IMAGE } from '../constants';
import { Category, Order } from '../types';
import { 
  BarChart3, 
  ShoppingBag, 
  CalendarDays, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search,
  LogOut,
  Utensils,
  Download,
  FileText
} from 'lucide-react';

const ORDER_STATUSES: Order['status'][] = ['Pending', 'Processing', 'Completed', 'Cancelled'];
const MENU_CATEGORIES: Category[] = ['Snacks', 'Dosa', 'Pizza', 'Chinese', 'Pasta', 'Sandwiches', 'Beverages', 'Meals', 'Fries & Extras'];

const AdminDashboard: React.FC = () => {
  const { 
    menu, orders, bookings, 
    updateOrderStatus, updateBookingStatus, 
    deleteMenuItem, addMenuItem 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Orders' | 'Bookings' | 'Menu'>('Orders');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newItem, setNewItem] = useState<{ name: string; price: number; category: Category; image: string }>({
    name: '',
    price: 0,
    category: 'Snacks',
    image: DEFAULT_MENU_IMAGE,
  });

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.src !== DEFAULT_MENU_IMAGE) {
      event.currentTarget.src = DEFAULT_MENU_IMAGE;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'divyanshu007@') setIsAuthenticated(true);
    else alert('Invalid Credentials. ');
  };

  const downloadReport = (type: 'orders' | 'bookings') => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (type === 'orders') {
      csvContent += "ID,Student,Roll,Total,Status,Date\n";
      orders.forEach(o => {
        csvContent += `${o.id},"${o.studentName}",${o.rollNumber},${o.total},${o.status},${o.createdAt}\n`;
      });
    } else {
      csvContent += "ID,Name,Phone,Date,Slot,Persons,Status\n";
      bookings.forEach(b => {
        csvContent += `${b.id},"${b.name}",${b.phone},${b.date},${b.timeSlot},${b.persons},${b.status}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nmims_canteen_${type}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-black px-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold">Admin Portal</h2>
            <p className="text-zinc-500 mt-2">SukhSagar Hospitality Services</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Username</label>
              <input 
                disabled 
                value="admin" 
                className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-zinc-400 font-bold" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="Enter Admin Password"
                className="w-full bg-black border border-zinc-800 rounded-xl p-4 focus:border-red-600 outline-none transition-all font-bold text-white"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95 uppercase tracking-widest">
              Unlock Terminal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="site-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter">System Console</h1>
            <p className="text-zinc-500 font-medium">Monitoring NMIMS Navi Mumbai Hub</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-2 rounded-2xl">
            <button 
              onClick={() => setActiveTab('Orders')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'Orders' ? 'bg-red-600 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              <ShoppingBag size={18} /> Orders
            </button>
            <button 
              onClick={() => setActiveTab('Bookings')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'Bookings' ? 'bg-red-600 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              <CalendarDays size={18} /> Bookings
            </button>
            <button 
              onClick={() => setActiveTab('Menu')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'Menu' ? 'bg-red-600 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
            >
              <Utensils size={18} /> Menu Editor
            </button>
          </div>

          <button 
            onClick={() => setIsAuthenticated(false)}
            className="group flex items-center gap-2 text-zinc-500 hover:text-red-500 font-black transition-all"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Exit
          </button>
        </div>

        {/* Orders Management */}
        {activeTab === 'Orders' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow mr-6">
                <StatCard label="Total Revenue" value={`₹${orders.reduce((acc, o) => acc + o.total, 0)}`} color="text-green-500" />
                <StatCard label="Pending Orders" value={orders.filter(o => o.status === 'Pending').length} color="text-red-500" />
                <StatCard label="Completed Orders" value={orders.filter(o => o.status === 'Completed').length} color="text-zinc-400" />
              </div>
              <button 
                onClick={() => downloadReport('orders')}
                className="bg-white/5 hover:bg-white/10 text-white font-bold p-4 rounded-2xl border border-white/10 transition-all flex items-center gap-2"
              >
                <Download size={20} /> <span className="hidden md:inline">Export CSV</span>
              </button>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zinc-800/30">
                    <tr>
                      <th className="px-8 py-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Order ID</th>
                      <th className="px-8 py-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Student</th>
                      <th className="px-8 py-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Items</th>
                      <th className="px-8 py-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-5 text-xs font-black text-zinc-500 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-xs font-black text-zinc-500 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {orders.length > 0 ? orders.map(order => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6 font-mono text-xs text-red-500 font-bold">{order.id}</td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-black text-white">{order.studentName}</div>
                          <div className="text-xs text-zinc-500 font-medium uppercase tracking-tighter">{order.rollNumber}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-xs text-zinc-400 font-medium truncate max-w-[200px]">
                            {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                          </div>
                        </td>
                        <td className="px-8 py-6 font-black text-white text-lg">₹{order.total}</td>
                        <td className="px-8 py-6">
                          <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            order.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                            order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                            order.status === 'Cancelled' ? 'bg-zinc-800 text-zinc-500' :
                            'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <select 
                            className="bg-black border border-zinc-800 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:border-red-600 cursor-pointer"
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          >
                            {ORDER_STATUSES.map(status => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center opacity-30">
                            <FileText size={64} className="mb-4" />
                            <p className="text-xl font-bold">No data found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Management */}
        {activeTab === 'Bookings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black flex items-center gap-3"><CalendarDays className="text-red-600" /> Active Reservations</h2>
              <button 
                onClick={() => downloadReport('bookings')}
                className="bg-white/5 hover:bg-white/10 text-white font-bold p-4 rounded-2xl border border-white/10 transition-all flex items-center gap-2"
              >
                <Download size={20} /> <span>Download List</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookings.length > 0 ? bookings.map(booking => (
                <div key={booking.id} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-red-600/30 transition-all shadow-xl">
                  <div className={`absolute top-0 right-0 px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl ${
                    booking.status === 'Confirmed' ? 'bg-green-600 text-white' : 
                    booking.status === 'Cancelled' ? 'bg-zinc-800 text-zinc-500' : 'bg-red-600 text-white'
                  }`}>
                    {booking.status}
                  </div>
                  <h3 className="text-2xl font-black mb-1 text-white">{booking.name}</h3>
                  <p className="text-sm font-bold text-zinc-500 mb-8 uppercase tracking-widest">{booking.phone}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800/50">
                      <div className="text-[10px] font-black text-zinc-600 uppercase mb-1">Date</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <CalendarDays size={14} className="text-red-500" /> {booking.date}
                      </div>
                    </div>
                    <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800/50">
                      <div className="text-[10px] font-black text-zinc-600 uppercase mb-1">Time</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <Clock size={14} className="text-red-500" /> {booking.timeSlot}
                      </div>
                    </div>
                    <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800/50 col-span-2">
                      <div className="text-[10px] font-black text-zinc-600 uppercase mb-1">Party Size</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <BarChart3 size={14} className="text-red-500" /> {booking.persons} Students
                      </div>
                    </div>
                  </div>

                  {booking.specialRequest && (
                    <div className="bg-zinc-800/40 p-5 rounded-2xl mb-8 border border-zinc-700/30 text-xs italic text-zinc-400 leading-relaxed">
                      "{booking.specialRequest}"
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                      className="flex-grow bg-green-600/10 text-green-500 py-3 rounded-xl font-black text-xs hover:bg-green-600 hover:text-white transition-all uppercase tracking-widest border border-green-600/20"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                      className="flex-grow bg-red-600/10 text-red-500 py-3 rounded-xl font-black text-xs hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest border border-red-600/20"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-32 text-center text-zinc-600 bg-zinc-900/20 rounded-[3rem] border-2 border-dashed border-zinc-800">
                  <CalendarDays size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="text-2xl font-black opacity-30">No table bookings to display</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu Management */}
        {activeTab === 'Menu' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
              <h2 className="text-3xl font-black mb-10 flex items-center gap-4"><Plus className="text-red-600" size={32} /> Update Catalog</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Item Nomenclature</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Schezwan Noodles"
                    className="w-full bg-black border border-zinc-800 rounded-2xl p-4 focus:border-red-600 outline-none font-bold text-white transition-all"
                    value={newItem.name}
                    onChange={e => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Price Point (₹)</label>
                  <input 
                    type="number" 
                    placeholder="99"
                    className="w-full bg-black border border-zinc-800 rounded-2xl p-4 focus:border-red-600 outline-none font-bold text-white transition-all"
                    value={newItem.price}
                    onChange={e =>
                      setNewItem({
                        ...newItem,
                        price: Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Category Allocation</label>
                  <select 
                    className="w-full bg-black border border-zinc-800 rounded-2xl p-4 focus:border-red-600 outline-none text-white font-bold appearance-none cursor-pointer"
                    value={newItem.category}
                    onChange={e => setNewItem({ ...newItem, category: e.target.value as Category })}
                  >
                    {MENU_CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={() => {
                      if (!newItem.name || !newItem.price) return;
                      addMenuItem({...newItem, id: `dish-${Date.now()}`});
                      setNewItem({ name: '', price: 0, category: 'Snacks', image: DEFAULT_MENU_IMAGE });
                    }}
                    className="w-full bg-red-600 text-white font-black py-4 rounded-2xl hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-600/20 uppercase tracking-widest"
                  >
                    Deploy Item
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {menu.map(item => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden flex flex-col group hover:border-red-600/40 transition-all shadow-xl">
                  <div className="h-40 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    <button 
                      onClick={() => deleteMenuItem(item.id)}
                      className="absolute top-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl text-zinc-400 hover:text-red-500 transition-all transform hover:scale-110 active:scale-90"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">{item.category}</div>
                    <h3 className="font-black text-lg text-white group-hover:text-red-600 transition-colors">{item.name}</h3>
                    <div className="text-2xl font-black mt-3 text-white">₹{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] backdrop-blur-sm">
    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">{label}</div>
    <div className={`text-4xl font-black ${color} tracking-tighter`}>{value}</div>
  </div>
);

export default AdminDashboard;
