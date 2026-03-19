import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Pagination } from './components/Pagination';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const ShopContent = () => {
  const { paginatedProducts, filteredProducts, searchQuery } = useShop();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans text-gray-900">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        onFavoritesClick={() => setIsFavoritesOpen(true)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero Section */}
        {!searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden bg-black text-white p-8 md:p-16 mb-12"
          >
            <div className="relative z-10 max-w-xl">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 block">New Collection 2026</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Elevate Your Daily <span className="text-emerald-500 italic">Essentials.</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Discover our curated selection of premium products designed for modern living. Quality meets minimalism.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-gray-100 transition-all active:scale-95">
                <span>Shop Collection</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" 
                alt="Hero" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}

        {/* Shop Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Browse Products'}
            </h2>
            <p className="text-gray-500 text-sm">Showing {filteredProducts.length} items</p>
          </div>
          <Filters />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Pagination />
      </main>

      {/* Drawers & Modals */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      <FavoritesDrawer 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
      />
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-xl font-bold tracking-tighter text-black mb-4 block">SWIFT<span className="text-emerald-600">SHOP</span></span>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Premium e-commerce experience built with React and Tailwind CSS. 
                Designed for speed, accessibility, and modern aesthetics.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-widest">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Home & Living</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-widest">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-400">© 2026 SwiftShop. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-400 hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}
