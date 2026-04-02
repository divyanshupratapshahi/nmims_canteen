
import React, { useState } from 'react';
import { useApp } from '../App';
import { MenuItem, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Search, Plus, Filter } from 'lucide-react';

const MenuPage: React.FC = () => {
  const { menu, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-black min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Our Menu</h1>
          <p className="text-zinc-400">Explore a wide variety of snacks, meals, and refreshments.</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder="Search for dishes..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-2 custom-scrollbar">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                activeCategory === 'All' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-red-900/30 transition-all flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold text-zinc-300 px-2 py-1 rounded-md uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
                    Delicious {item.name.toLowerCase()} prepared fresh daily by our skilled chefs.
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-white">₹{item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-lg shadow-red-600/20"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-zinc-500 text-lg">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
