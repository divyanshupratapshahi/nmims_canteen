
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, MapPin, FastForward, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover opacity-50"
            alt="Delicious food background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-orange-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                NMIMS Navi Mumbai Official Canteen
              </span>
              <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                <Star size={12} fill="currentColor" /> 4.8 Rating
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8">
              Welcome to <span className="text-red-600">NMIMS</span> Navi Mumbai Canteen
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-10 leading-relaxed font-light">
              Order your favorite food online and skip the long queues. 
              SukhSagar Hospitality brings premium taste and hygiene to your campus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/menu" 
                className="group inline-flex items-center justify-center px-10 py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/40"
              >
                Order Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
              <Link 
                to="/booking" 
                className="inline-flex items-center justify-center px-10 py-5 bg-zinc-900/80 backdrop-blur-md text-white font-bold rounded-2xl border border-white/10 hover:bg-zinc-800 transition-all shadow-xl"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>

        {/* Floating scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-1 h-12 bg-gradient-to-b from-red-600 to-transparent rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <FeatureCard 
              icon={<FastForward className="text-orange-500" size={32} />} 
              title="Flash Delivery" 
              desc="Pre-order and pick up within minutes of preparation."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-red-500" size={32} />} 
              title="Safety First" 
              desc="SukhSagar follows strict FSSAI hygiene guidelines."
            />
            <FeatureCard 
              icon={<Clock className="text-orange-500" size={32} />} 
              title="Full Service" 
              desc="Open 8 AM to 8 PM. Breakfast, Lunch, and Snacks."
            />
            <FeatureCard 
              icon={<MapPin className="text-red-500" size={32} />} 
              title="Campus Hub" 
              desc="The heart of NMIMS Navi Mumbai campus dining."
            />
          </div>
        </div>
      </section>

      {/* Popular Items Showcase */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4 block">Student Picks</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Trending This Week</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeaturedItem 
            img="https://www.ohmyveg.co.uk/wp-content/uploads/2023/12/Misal-Pav-2-2-e1722869218662.jpg" 
            name="Spicy Misal Pav" 
            price="₹46" 
            tag="Hottest"
          />
          <FeaturedItem 
            img="https://dukaan.b-cdn.net/700x700/webp/728141/9f62eaec-30f0-46cf-9536-f2da75201869.png" 
            name="Paneer Cheese Frankie" 
            price="₹100" 
            tag="Gourmet"
          />
          <FeaturedItem 
            img="https://i.pinimg.com/736x/fa/12/6f/fa126f74b610d1ec478d74c5c97ffd07.jpg" 
            name="Triple Noodles" 
            price="₹92" 
            tag="Heavy Meal"
          />
        </div>

        <div className="text-center mt-20">
          <Link to="/menu" className="inline-flex items-center gap-3 text-red-500 font-black text-xl hover:text-orange-500 transition-all uppercase tracking-tighter">
            Discover Full Menu <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-10 bg-zinc-900/30 rounded-[2rem] border border-zinc-800 hover:border-red-600/40 transition-all group hover:-translate-y-2">
    <div className="mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-black text-white mb-3">{title}</h3>
    <p className="text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);

const FeaturedItem = ({ img, name, price, tag }: { img: string, name: string, price: string, tag: string }) => (
  <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
    <img src={img} alt={name} className="w-full h-[450px] object-cover group-hover:scale-110 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
    <div className="absolute top-6 left-6">
      <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
        {tag}
      </span>
    </div>
    <div className="absolute bottom-8 left-8 right-8">
      <h3 className="text-3xl font-black text-white mb-2">{name}</h3>
      <p className="text-orange-500 text-2xl font-black">{price}</p>
    </div>
  </div>
);

export default Home;
