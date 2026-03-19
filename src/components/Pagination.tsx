import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Pagination: React.FC = () => {
  const { currentPage, totalPages, setCurrentPage } = useShop();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 pb-12">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-black/5 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
            currentPage === i + 1
              ? 'bg-black text-white shadow-lg shadow-black/10'
              : 'bg-white text-gray-600 border border-black/5 hover:bg-gray-50'
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-black/5 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
