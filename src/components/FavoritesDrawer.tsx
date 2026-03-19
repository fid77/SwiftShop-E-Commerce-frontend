import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
  const { favorites, products, toggleFavorite, addToCart } = useShop();
  
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <h2 className="text-xl font-bold tracking-tight">Favorites</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {favoriteProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">No favorites yet</p>
                    <p className="text-sm text-gray-500">Start adding products you love!</p>
                  </div>
                </div>
              ) : (
                favoriteProducts.map((product) => (
                  <div key={product.id} className="flex space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">${product.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-1"
                        >
                          <ShoppingCart className="h-3 w-3" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors border border-black/5 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
