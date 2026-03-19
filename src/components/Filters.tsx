import React from 'react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';

const categories: Category[] = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty'];

export const Filters: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setCurrentPage } = useShop();

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedCategory === category
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-white text-gray-600 border border-black/5 hover:bg-gray-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
