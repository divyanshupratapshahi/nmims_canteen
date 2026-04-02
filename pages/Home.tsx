import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  MapPin,
  FastForward,
  Star,
  CalendarDays,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react';
import { useApp } from '../App';
import { DEFAULT_MENU_IMAGE } from '../constants';
import { MenuItem } from '../types';

const LAST_SECTION_IMAGE =
  'https://hospitality.nmims.edu/images/facilities/Modern%20Cafeteria.jpg';
const GALLERY_FEATURE_IMAGE =
  'https://engineering.nmims.edu/wp-content/webp-express/webp-images/uploads/2024/06/1044_SGP_SG18007_2024-1.jpg.webp';
const GALLERY_SPACE_IMAGE ='https://github.com/user-attachments/assets/5961a9ed-7049-4554-bbc8-9f8c1b9539ed';

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  if (event.currentTarget.src !== DEFAULT_MENU_IMAGE) {
    event.currentTarget.src = DEFAULT_MENU_IMAGE;
  }
};

const Home: React.FC = () => {
  const { menu } = useApp();

  const totalCategories = new Set(menu.map(item => item.category)).size;
  const featuredOrder = ['Paneer Cheese Frankie', 'Vada Pav', 'Chhola Bhatura', 'Cold Coffee'];
  const featuredItems = featuredOrder
    .map(name => menu.find(item => item.name === name))
    .filter((item): item is MenuItem => Boolean(item));

  const showcaseItems = [
    ...featuredItems,
    ...menu.filter(item => !featuredItems.some(featured => featured.id === item.id)),
  ].slice(0, 4);

  const spotlightItem = showcaseItems[0];
  const supportingItems = showcaseItems.slice(1);
  const galleryItems = [
    {
      id: 'campus-gallery-feature',
      image: GALLERY_FEATURE_IMAGE,
      title: 'Campus Dining Moments',
      subtitle: 'Students gathering inside the NMIMS food court',
      accent: 'Campus View',
    },
    {
      id: 'campus-gallery-space',
      image: LAST_SECTION_IMAGE,
      title: 'Modern Cafeteria',
      subtitle: 'Contemporary seating and canteen atmosphere',
      accent: 'Gallery',
    },
    {
      id: 'Outside-dinning-area',
      image: GALLERY_SPACE_IMAGE,
      title: 'Outside Dinning Area',
      subtitle: 'Eating area outside the canteen',
      accent: 'Gallery',
    },
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://engineering.nmims.edu/wp-content/webp-express/webp-images/uploads/2024/06/208_SGP_SG32011_2024.jpg.webp"
            className="w-full h-full object-cover opacity-50"
            alt="Delicious food background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative site-container mx-auto px-4 sm:px-6 lg:px-8 w-full pt-14 pb-10 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-orange-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                NMIMS Navi Mumbai Official Canteen
              </span>
              <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                <Star size={12} fill="currentColor" /> 4.8 Rating
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl xl:text-8xl font-black text-white leading-[1.1] mb-6 md:mb-8">
              Welcome to <span className="text-red-600">NMIMS</span> Navi Mumbai Canteen
            </h1>
            <p className="text-lg md:text-2xl text-zinc-300 mb-8 md:mb-10 leading-relaxed font-light max-w-2xl">
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

      {/* Snapshot Strip */}
      <section className="relative -mt-6 md:-mt-10 lg:-mt-12 z-10 pb-8">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SnapshotCard value={`${menu.length}+`} label="Menu Items" detail="Snacks, meals, beverages, and more." />
            <SnapshotCard value={`${totalCategories}`} label="Food Zones" detail="Built around class breaks and cravings." />
            <SnapshotCard value="8 AM - 8 PM" label="Serving Window" detail="Breakfast, lunch, snacks, and dinner." />
            <SnapshotCard value="Quick Pickup" label="Student First" detail="Pre-order fast and skip queue pressure." />
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-24 bg-zinc-950">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-4">
              Why It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Campus dining designed around your actual schedule
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              From lecture gaps to lunch breaks, the canteen experience should feel fast, reliable, and easy to act on.
              This flow keeps the most useful information close to the top.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<FastForward className="text-orange-500" size={32} />}
                title="Faster Between Classes"
                desc="Pre-order online, reduce wait time, and walk in when your meal is nearly ready."
              />
              <FeatureCard
                icon={<ShieldCheck className="text-red-500" size={32} />}
                title="Trustworthy Kitchen"
                desc="A cleaner, more dependable experience with hygiene and consistency at the center."
              />
              <FeatureCard
                icon={<Clock className="text-orange-500" size={32} />}
                title="Full-Day Coverage"
                desc="Breakfast, lunch, quick bites, and beverages available across the busiest campus hours."
              />
              <FeatureCard
                icon={<MapPin className="text-red-500" size={32} />}
                title="Right On Campus"
                desc="Easy to reach, easy to pick up from, and practical when the next class is already close."
              />
            </div>

            <div className="rounded-[2rem] border border-red-900/30 bg-gradient-to-b from-red-950/30 via-zinc-950 to-black p-8 shadow-2xl">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-zinc-300">
                <ShoppingBag size={14} className="text-red-500" />
                Quick Flow
              </div>

              <div className="space-y-6 mt-8">
                <FlowStep
                  index="01"
                  title="Browse what you want"
                  desc="Search the menu, filter categories quickly, and find the exact dish in seconds."
                />
                <FlowStep
                  index="02"
                  title="Place the order early"
                  desc="Order before the rush to cut down waiting and collect food on your own timing."
                />
                <FlowStep
                  index="03"
                  title="Book when you need a seat"
                  desc="Planning a sit-down meal or meeting friends? Reserve a table before the crowd builds."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl px-6 py-4 transition-all"
                >
                  Start Order <ArrowRight size={18} />
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl px-6 py-4 transition-all"
                >
                  Reserve Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 md:py-8 bg-black">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <GalleryCard
              image={galleryItems[0].image}
              title={galleryItems[0].title}
              subtitle={galleryItems[0].subtitle}
              accent={galleryItems[0].accent}
              large
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 col-span-2 lg:col-span-1">
              {galleryItems.slice(1).map(item => (
                <GalleryCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  accent={item.accent}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Showcase */}
      <section className="pt-6 md:pt-8 lg:pt-10 pb-28 bg-black">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div className="max-w-3xl">
              <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                Student Picks
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
                Popular on campus right now
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Fresh favorites students keep coming back for, from quick bites to proper meals and coffee breaks.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-3 text-red-500 font-black text-lg hover:text-orange-500 transition-all uppercase tracking-tight"
            >
              Discover Full Menu <ArrowRight size={22} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
            {spotlightItem && (
              <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-950 shadow-2xl group">
                <img
                  src={spotlightItem.image}
                  alt={spotlightItem.name}
                  onError={handleImageError}
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Most Wanted
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                  <div>
                    <p className="text-zinc-300 font-bold uppercase tracking-[0.2em] text-xs mb-3">
                      {spotlightItem.category}
                    </p>
                    <h3 className="text-4xl font-black text-white mb-3">{spotlightItem.name}</h3>
                    <p className="text-zinc-300 max-w-xl leading-relaxed">
                      A standout favorite for busy breaks, catch-ups with friends, and those moments when you want something satisfying without overthinking it.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-orange-500 text-3xl font-black mb-4">₹{spotlightItem.price}</p>
                    <Link
                      to="/menu"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold rounded-2xl px-5 py-3 transition-all"
                    >
                      Order This Now <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              {supportingItems.map(item => (
                <MenuShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <ActionPanel
              icon={<ShoppingBag className="text-red-500" size={24} />}
              title="Order Before Rush Hour"
              desc="Place your order early and collect it when your break starts instead of waiting in line."
              cta="Browse Menu"
              to="/menu"
            />
            <ActionPanel
              icon={<CalendarDays className="text-orange-500" size={24} />}
              title="Reserve Before You Arrive"
              desc="Planning a group lunch or a quieter sit-down break? Book your table ahead of time."
              cta="Book Table"
              to="/booking"
            />
            <ActionPanel
              icon={<UtensilsCrossed className="text-red-500" size={24} />}
              title="From Snacks to Meals"
              desc="Explore everything from quick snacks and beverages to filling meals for longer breaks."
              cta="See Categories"
              to="/menu"
            />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-black">
        <div className="site-container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-black bg-cover bg-center p-10 md:p-14 shadow-2xl"
            style={{ backgroundImage: `url(${LAST_SECTION_IMAGE})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(239,68,68,0.18),_transparent_45%)]"></div>
            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-2 text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-5">
                  Ready To Order
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
                  Your next campus meal is only a few taps away
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Browse the full menu, place an order before the rush, or reserve a table when you want a smoother sit-down break.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all"
                >
                  Explore Menu <ArrowRight size={20} />
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                >
                  Plan a Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SnapshotCard = ({ value, label, detail }: { value: string; label: string; detail: string }) => (
  <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl p-6 shadow-xl">
    <div className="text-2xl md:text-3xl font-black text-white mb-2">{value}</div>
    <div className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-3">{label}</div>
    <p className="text-sm text-zinc-400 leading-relaxed">{detail}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="p-8 bg-zinc-900/40 rounded-[2rem] border border-zinc-800 hover:border-red-600/40 transition-all group hover:-translate-y-1">
    <div className="mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-black text-white mb-3">{title}</h3>
    <p className="text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);

const FlowStep = ({ index, title, desc }: { index: string; title: string; desc: string }) => (
  <div className="flex gap-4">
    <div className="shrink-0 w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black tracking-widest text-red-400">
      {index}
    </div>
    <div>
      <h3 className="text-lg font-black text-white mb-2">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const MenuShowcaseCard: React.FC<{ item: MenuItem }> = ({ item }) => (
  <div className="rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl group">
    <div className="relative overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        onError={handleImageError}
        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute top-4 left-4">
        <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold text-zinc-200 px-3 py-1.5 rounded-full uppercase tracking-widest">
          {item.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-black text-white mb-2">{item.name}</h3>
      <p className="text-zinc-500 leading-relaxed mb-5">
        Freshly served, student-friendly, and ready for your next break.
      </p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xl font-black text-orange-500">₹{item.price}</span>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-orange-500 transition-colors"
        >
          View Menu <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </div>
);

const ActionPanel = ({
  icon,
  title,
  desc,
  cta,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  to: string;
}) => (
  <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/50 p-7 shadow-xl">
    <div className="mb-5">{icon}</div>
    <h3 className="text-xl font-black text-white mb-3">{title}</h3>
    <p className="text-zinc-500 leading-relaxed mb-6">{desc}</p>
    <Link to={to} className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-orange-500 transition-colors">
      {cta} <ArrowRight size={18} />
    </Link>
  </div>
);

const GalleryCard: React.FC<{
  image: string;
  title: string;
  subtitle: string;
  accent: string;
  large?: boolean;
}> = ({
  image,
  title,
  subtitle,
  accent,
  large = false,
}) => (
  <div
    className={`group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 ${
      large ? 'col-span-2 lg:col-span-1 h-64 md:h-80 lg:h-[28rem]' : 'h-52 md:h-56 lg:h-[13rem]'
    }`}
  >
    <img
      src={image}
      alt={title}
      onError={handleImageError}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.22),_transparent_40%)]"></div>
    <div className="absolute left-5 right-5 bottom-5">
      <span className="inline-flex items-center rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-red-400 backdrop-blur-md">
        {accent}
      </span>
      <h3 className={`mt-3 font-black text-white ${large ? 'text-3xl md:text-4xl' : 'text-xl'}`}>{title}</h3>
      <p className={`mt-2 text-zinc-300 ${large ? 'text-base' : 'text-sm'}`}>{subtitle}</p>
    </div>
  </div>
);

export default Home;
