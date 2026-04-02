
import React, { useState } from 'react';
import { useApp } from '../App';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    rollNumber: '',
    paymentMethod: 'UPI' as 'UPI' | 'Card' | 'COD'
  });
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    placeOrder({
      studentName: formData.name,
      rollNumber: formData.rollNumber,
      email: formData.email,
      mobile: formData.mobile,
      items: cart,
      total,
      paymentMethod: formData.paymentMethod
    });
    
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-green-500/10 p-6 rounded-full mb-8 animate-bounce">
          <CheckCircle size={80} className="text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-zinc-400 max-w-md mb-8">
          Your delicious meal is being prepared. You will receive an update shortly on your mobile number.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/menu" className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-700 transition-all">
            Order More
          </Link>
          <button onClick={() => navigate('/')} className="bg-white/10 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/20 transition-all">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-zinc-900 p-8 rounded-3xl mb-8">
          <ShoppingBag size={80} className="text-zinc-700" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-zinc-400 mb-8">Add some delicious items from our menu to get started.</p>
        <Link to="/menu" className="bg-red-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-red-700 transition-all flex items-center gap-2">
          <ArrowLeft size={20} /> Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 flex items-center gap-4">
          <ShoppingBag className="text-red-600" size={36} /> Review Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex gap-6 items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-red-500 font-bold mb-2">₹{item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-zinc-800 rounded-lg p-1">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1.5 hover:bg-zinc-700 rounded-md transition-colors"><Minus size={14} /></button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1.5 hover:bg-zinc-700 rounded-md transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold mb-2">₹{item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-zinc-500 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-28">
              <h2 className="text-2xl font-bold mb-6">Student Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-red-600 outline-none transition-all"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Roll Number</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-red-600 outline-none transition-all"
                    placeholder="e.g. 70012200001"
                    value={formData.rollNumber}
                    onChange={e => setFormData({...formData, rollNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Mobile</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-red-600 outline-none transition-all"
                      placeholder="10 digit number"
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-red-600 outline-none transition-all"
                      placeholder="Student email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 mt-6">
                  <h3 className="font-bold mb-4">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['UPI', 'Card', 'COD'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: method as any})}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          formData.paymentMethod === method 
                            ? 'bg-red-600 border-red-600 text-white' 
                            : 'bg-black border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 space-y-2 text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (5% GST)</span>
                    <span className="text-white">₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-zinc-800">
                    <span>Total Amount</span>
                    <span className="text-red-500">₹{total}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-4 rounded-xl mt-8 hover:bg-red-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  Confirm & Place Order <CreditCard size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
