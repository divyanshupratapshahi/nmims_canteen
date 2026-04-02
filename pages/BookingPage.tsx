
import React, { useState } from 'react';
import { useApp } from '../App';
import { Calendar, Users, Clock, MessageSquare, CheckCircle } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { bookTable } = useApp();
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '12:00 PM',
    persons: 2,
    specialRequest: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', 
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookTable(formData);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-black">
        <div className="bg-red-600/20 p-6 rounded-full mb-8 animate-pulse">
          <CheckCircle size={80} className="text-red-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Table Reserved!</h1>
        <p className="text-zinc-400 max-w-md mb-8">
          Your reservation for {formData.persons} persons on {formData.date} at {formData.timeSlot} is confirmed. 
          We've sent the details to {formData.phone}.
        </p>
        <button onClick={() => setIsBooked(false)} className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-700 transition-all">
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Book a Table</h1>
          <p className="text-zinc-500 text-lg">Reserve your spot for a comfortable dining experience with your friends.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-red-600 p-10 flex flex-col justify-center text-white">
            <h2 className="text-2xl font-bold mb-6">Why Book?</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><Clock size={20} /></div>
                <p className="text-sm font-medium">Skip the lunch hour rush and get priority seating.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><Users size={20} /></div>
                <p className="text-sm font-medium">Perfect for group meetings and project discussions.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><CheckCircle size={20} /></div>
                <p className="text-sm font-medium">Safe and hygienic seating arrangement for students.</p>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="md:w-2/3 p-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Your Name"
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-red-600 outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="Mobile Number"
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-red-600 outline-none transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    required
                    type="date" 
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 pl-10 focus:border-red-600 outline-none transition-all text-sm"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <select 
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 pl-10 focus:border-red-600 outline-none transition-all text-sm appearance-none"
                    value={formData.timeSlot}
                    onChange={e => setFormData({...formData, timeSlot: e.target.value})}
                  >
                    {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Persons</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    required
                    type="number" 
                    min="1" 
                    max="20"
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 pl-10 focus:border-red-600 outline-none transition-all text-sm"
                    value={formData.persons}
                    onChange={e => setFormData({...formData, persons: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Special Request (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 text-zinc-600" size={18} />
                <textarea 
                  rows={3}
                  placeholder="e.g. Near window, extra chairs, birthday setup..."
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 pl-10 focus:border-red-600 outline-none transition-all text-sm"
                  value={formData.specialRequest}
                  onChange={e => setFormData({...formData, specialRequest: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all transform hover:translate-y-[-2px] shadow-lg shadow-red-600/30"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
