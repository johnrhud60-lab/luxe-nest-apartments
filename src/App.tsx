import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  ChevronRight, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Clock,
  Info
} from 'lucide-react';
import { cn } from './lib/utils';
import { Property } from './types';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold tracking-tighter text-charcoal">
              LUXE<span className="text-gold">NEST</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-gold transition-colors">Home</Link>
            <Link to="/listings" className="text-sm font-medium hover:text-gold transition-colors">Listings</Link>
            <Link to="/about" className="text-sm font-medium hover:text-gold transition-colors">About</Link>
            <Link to="/admin" className="px-4 py-2 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gold transition-all">Admin</Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gold/10 px-4 py-6 space-y-4"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-serif">Home</Link>
            <Link to="/listings" onClick={() => setIsOpen(false)} className="block text-lg font-serif">Listings</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-serif">About</Link>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-lg font-serif">Admin</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-white rounded-2xl overflow-hidden luxury-shadow border border-gold/5"
  >
    <Link to={`/property/${property.id}`} className="block relative h-72 overflow-hidden">
      <img 
        src={property.images[0]} 
        alt={property.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold border border-gold/20">
        {property.region}
      </div>
      <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
        <Heart size={18} />
      </button>
    </Link>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-serif font-bold text-charcoal">{property.title}</h3>
        <span className="text-lg font-bold text-gold">${property.price.toLocaleString()}<span className="text-xs text-gray-400 font-normal">/mo</span></span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <MapPin size={14} className="mr-1" />
        {property.location}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gold/10">
        <div className="flex space-x-4">
          <div className="flex items-center text-xs text-gray-400">
            <Bed size={14} className="mr-1" /> {property.beds}
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Bath size={14} className="mr-1" /> {property.baths}
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Square size={14} className="mr-1" /> {property.sqft}
          </div>
        </div>
        <Link to={`/property/${property.id}`} className="text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold flex items-center transition-colors">
          View <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  </motion.div>
);

// --- Pages ---

const HomePage = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687940-4e524cb35797?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Home"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
              Elevated Living <br />
              <span className="text-gold italic">Global Reach.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl text-gray-200">
              Discover curated luxury apartments across the most prestigious locations in the US and Africa.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/listings" className="px-10 py-5 bg-gold text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-gold transition-all text-center">
                Explore Listings
              </Link>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest rounded-full border border-white/30 hover:bg-white/20 transition-all text-center">
                Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured Properties</h2>
          </div>
          <Link to="/listings" className="hidden md:flex items-center text-sm font-bold uppercase tracking-widest text-gold hover:text-charcoal transition-colors">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Bridging Continents <br />Through Luxury</h2>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                LuxeNest specializes in high-end residential properties in major US hubs and Africa's fastest-growing luxury markets. From Manhattan penthouses to Nairobi villas, we offer unparalleled access to global living.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-serif text-gold mb-2">12+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Major Cities</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-gold mb-2">500+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Premium Units</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" 
                  alt="Modern Architecture"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-gold p-8 rounded-2xl luxury-shadow hidden md:block">
                <Globe size={48} className="text-white mb-4" />
                <div className="text-white font-bold uppercase tracking-widest text-sm">Global Network</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then(res => res.json())
      .then(data => setProperty(data));
  }, [id]);

  if (!property) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pt-20">
      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[60vh]">
        <div className="h-full overflow-hidden">
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="grid grid-cols-2 gap-2 h-full">
          {property.images.slice(1, 5).map((img, i) => (
            <div key={i} className="h-full overflow-hidden">
              <img src={img} alt={`${property.title} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ))}
          {property.images.length < 5 && (
             <div className="h-full bg-gray-100 flex items-center justify-center text-gray-400">
               No more photos
             </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-5xl font-serif font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-gray-500">
                  <MapPin size={18} className="mr-2 text-gold" />
                  {property.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gold">${property.price.toLocaleString()}</div>
                <div className="text-sm text-gray-400">per month</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-8 py-8 border-y border-gold/10 mb-12">
              <div className="text-center">
                <Bed className="mx-auto mb-2 text-gold" />
                <div className="text-lg font-bold">{property.beds}</div>
                <div className="text-xs uppercase text-gray-400">Bedrooms</div>
              </div>
              <div className="text-center">
                <Bath className="mx-auto mb-2 text-gold" />
                <div className="text-lg font-bold">{property.baths}</div>
                <div className="text-xs uppercase text-gray-400">Bathrooms</div>
              </div>
              <div className="text-center">
                <Square className="mx-auto mb-2 text-gold" />
                <div className="text-lg font-bold">{property.sqft}</div>
                <div className="text-xs uppercase text-gray-400">Sq Ft</div>
              </div>
              <div className="text-center">
                <Globe className="mx-auto mb-2 text-gold" />
                <div className="text-lg font-bold">{property.region}</div>
                <div className="text-xs uppercase text-gray-400">Region</div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-6">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center text-gray-600">
                    <CheckCircle2 size={16} className="mr-2 text-gold" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white p-8 rounded-3xl luxury-shadow border border-gold/10">
              <h3 className="text-2xl font-serif font-bold mb-6">Apply for Tenancy</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-3 text-sm text-gray-600">
                  <CreditCard className="text-gold mt-1" size={18} />
                  <div>
                    <span className="font-bold text-charcoal">Application Fee: $49.00</span>
                    <p className="text-xs text-red-500 mt-1 font-medium">Strictly Non-Refundable</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-600">
                  <ShieldCheck className="text-gold mt-1" size={18} />
                  <div>
                    <span className="font-bold text-charcoal">Secure Process</span>
                    <p className="text-xs">Your data is encrypted and handled with care.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-600">
                  <Clock className="text-gold mt-1" size={18} />
                  <div>
                    <span className="font-bold text-charcoal">Fast Review</span>
                    <p className="text-xs">Most applications are reviewed within 48 hours.</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/apply/${property.id}`)}
                className="w-full py-4 bg-charcoal text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gold transition-all mb-4"
              >
                Apply Now
              </button>
              
              <button className="w-full py-4 bg-white text-charcoal border border-charcoal/20 font-bold uppercase tracking-widest rounded-xl hover:border-gold hover:text-gold transition-all">
                Schedule Viewing
              </button>
              
              <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-widest">
                By applying, you agree to our <Link to="/terms" className="underline">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    income: '',
    occupation: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then(res => res.json())
      .then(data => setProperty(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Initiate PesaPal Payment
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 49,
          email: formData.email,
          firstName: formData.fullName.split(' ')[0],
          lastName: formData.fullName.split(' ').slice(1).join(' '),
          propertyId: id,
          income: formData.income,
          occupation: formData.occupation,
          message: formData.message
        })
      });
      
      const data = await response.json();
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!property) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Tenant Application</h1>
        <p className="text-gray-500">Applying for <span className="text-gold font-bold">{property.title}</span></p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl luxury-shadow border border-gold/10">
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-10 flex items-start space-x-4">
          <Info className="text-amber-600 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-amber-900 mb-1">Non-Refundable Application Fee</h4>
            <p className="text-sm text-amber-800 leading-relaxed">
              A fee of <span className="font-bold">$49.00 USD</span> is required to process your application. This fee is strictly non-refundable regardless of the application outcome.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-cream border-none rounded-xl focus:ring-2 focus:ring-gold outline-none"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input 
                required
                type="email" 
                className="w-full px-4 py-3 bg-cream border-none rounded-xl focus:ring-2 focus:ring-gold outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Monthly Income (USD)</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 bg-cream border-none rounded-xl focus:ring-2 focus:ring-gold outline-none"
                value={formData.income}
                onChange={e => setFormData({...formData, income: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Occupation</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-cream border-none rounded-xl focus:ring-2 focus:ring-gold outline-none"
                value={formData.occupation}
                onChange={e => setFormData({...formData, occupation: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Cover Message</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 bg-cream border-none rounded-xl focus:ring-2 focus:ring-gold outline-none resize-none"
              placeholder="Tell us a bit about yourself..."
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="pt-6">
            <button 
              disabled={isSubmitting}
              type="submit"
              className="w-full py-5 bg-charcoal text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-gold transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : (
                <>
                  <span>Pay $49 & Submit Application</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
              Secure payment powered by PesaPal
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-charcoal text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-3xl font-serif font-bold tracking-tighter mb-6 block">
            LUXE<span className="text-gold">NEST</span>
          </Link>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            The world's premier platform for high-end apartment rentals across the United States and Africa. Experience elevated living with LuxeNest.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/listings" className="hover:text-gold transition-colors">Listings</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-gold transition-colors">Admin Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Legal</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/refund" className="hover:text-gold transition-colors">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
        <p>&copy; 2026 LuxeNest Global. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Twitter</span>
        </div>
      </div>
    </div>
  </footer>
);

const ListingsPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState<'All' | 'US' | 'Africa'>('All');

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  const filteredProperties = filter === 'All' 
    ? properties 
    : properties.filter(p => p.region === filter);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-5xl font-serif font-bold mb-6">Our Properties</h1>
        <div className="flex space-x-4">
          {['All', 'US', 'Africa'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                filter === f ? "bg-gold text-white" : "bg-white text-charcoal border border-gold/20 hover:border-gold"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-40 pb-24 max-w-4xl mx-auto px-4">
    <h1 className="text-5xl font-serif font-bold mb-8">About LuxeNest</h1>
    <div className="prose prose-gold max-w-none text-gray-600 space-y-6 text-lg leading-relaxed">
      <p>
        LuxeNest was founded with a single vision: to redefine luxury living across borders. We believe that finding a home should be as premium an experience as living in one.
      </p>
      <p>
        Our team of global real estate experts hand-picks every property on our platform, ensuring they meet our rigorous standards for design, location, and amenities. Whether you're looking for a high-rise in Manhattan or a serene villa in Nairobi, LuxeNest is your gateway to the world's most prestigious addresses.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
        <div className="bg-white p-8 rounded-3xl luxury-shadow border border-gold/10">
          <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">Our Mission</h3>
          <p>To provide seamless access to global luxury real estate through technology and curated expertise.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl luxury-shadow border border-gold/10">
          <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">Our Values</h3>
          <p>Excellence, Transparency, and Global Connectivity drive everything we do at LuxeNest.</p>
        </div>
      </div>
    </div>
  </div>
);

const PaymentCallbackPage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-40 pb-24 max-w-md mx-auto px-4 text-center">
      <div className="bg-white p-12 rounded-3xl luxury-shadow border border-gold/10">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-serif font-bold mb-4">Payment Received</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your application. We have received your payment and our team will review your application shortly.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="w-full py-4 bg-charcoal text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gold transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
const TermsPage = () => (
  <div className="pt-40 pb-24 max-w-4xl mx-auto px-4">
    <h1 className="text-5xl font-serif font-bold mb-12">Terms of Service</h1>
    <div className="prose prose-gold max-w-none space-y-8 text-gray-600">
      <section>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">1. Non-Refundable Application Fee</h2>
        <p>Submission of an application requires a non-refundable fee of $49.00 USD. This fee covers the cost of background checks, credit reports, and administrative processing. By paying this fee, you acknowledge that it will not be refunded under any circumstances, including application rejection or property withdrawal.</p>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">2. Application Process</h2>
        <p>Submission of an application does not guarantee tenancy. LuxeNest acts as a platform for connecting tenants and landlords. Final decisions are made by property owners or their authorized agents.</p>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">3. Data Privacy</h2>
        <p>Your personal and financial information is collected solely for the purpose of evaluating your tenancy application. We use industry-standard encryption to protect your data.</p>
      </section>
    </div>
  </div>
);

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [applications, setApplications] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token]);

  const fetchApplications = async () => {
    const res = await fetch('/api/admin/applications', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setApplications(data);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('adminToken');
      setToken(null);
      setIsLoggedIn(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-40 pb-24 max-w-md mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl luxury-shadow border border-gold/10">
          <h1 className="text-3xl font-serif font-bold mb-8 text-center">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-cream rounded-xl outline-none" />
            </div>
            <button type="submit" className="w-full py-4 bg-charcoal text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gold transition-all">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-serif font-bold">Admin Dashboard</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('adminToken');
            setToken(null);
            setIsLoggedIn(false);
          }}
          className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>
      <div className="bg-white rounded-3xl luxury-shadow overflow-hidden border border-gold/10">
        <table className="w-full text-left">
          <thead className="bg-charcoal text-white text-xs font-bold uppercase tracking-widest">
            <tr>
              <th className="px-8 py-6">Applicant</th>
              <th className="px-8 py-6">Property</th>
              <th className="px-8 py-6">Income</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6">Date</th>
              <th className="px-8 py-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-8 py-6">
                  <div className="font-medium text-charcoal">{app.fullName}</div>
                  <div className="text-xs text-gray-400">{app.email}</div>
                </td>
                <td className="px-8 py-6 text-sm">{app.propertyTitle}</td>
                <td className="px-8 py-6 text-sm">${app.income.toLocaleString()}/mo</td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                    app.status === 'payment_confirmed' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {app.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-8 py-6 text-xs text-gray-400">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="px-8 py-6">
                  <button className="text-gold font-bold text-xs uppercase hover:underline">Review</button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-gray-400">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/apply/:id" element={<ApplicationPage />} />
            <Route path="/payment-callback" element={<PaymentCallbackPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
