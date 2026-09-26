import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const FilterSidebar = ({ filters, setFilters, handleReset, categories }) => {
  const navigate = useNavigate();
  const { catalogName } = useParams();

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === 'all') navigate('/catalog');
    else navigate(`/catalog/${val}`);
  };

  const handleDifficultyChange = (e) => {
    setFilters({ ...filters, difficulty: e.target.value });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, minRating: rating });
  };

  return (
    <div className="w-full lg:w-[280px] shrink-0 bg-[#121A2F] border border-gray-800 rounded-2xl p-6 text-gray-300 flex flex-col gap-8 h-fit sticky top-20">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 font-bold text-white text-lg">
          <FiFilter className="text-[#00C16A]" /> Filters
        </div>
        <button 
          onClick={handleReset}
          className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
        >
          Reset All
        </button>
      </div>

      {/* Category Selection */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Category</h3>
        <select 
          value={catalogName || 'all'}
          onChange={handleCategoryChange}
          className="w-full bg-[#0B101E] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C16A] appearance-none cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories?.map((cat) => (
             <option key={cat._id} value={cat.name.split(" ").join("-").toLowerCase()}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Difficulty Level */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Difficulty Level</h3>
        <div className="flex flex-col gap-3 text-sm">
          {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <label key={level} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                ${filters.difficulty === level ? 'border-[#00C16A]' : 'border-gray-500 group-hover:border-gray-400'}`}>
                {filters.difficulty === level && <div className="w-2 h-2 rounded-full bg-[#00C16A]" />}
              </div>
              <input 
                type="radio" 
                name="difficulty" 
                value={level} 
                className="hidden" 
                onChange={handleDifficultyChange}
                checked={filters.difficulty === level}
              />
              <span className={filters.difficulty === level ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white transition-colors'}>
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Interval */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Price Interval</h3>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            name="minPrice"
            value={filters.minPrice}
            onChange={handlePriceChange}
            placeholder="Min ($)"
            className="w-full bg-[#0B101E] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00C16A]"
          />
          <span className="text-gray-500">-</span>
          <input 
            type="number" 
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            placeholder="Max ($)"
            className="w-full bg-[#0B101E] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00C16A]"
          />
        </div>
        <button className="w-full bg-[#1A253E] hover:bg-[#233252] text-gray-300 hover:text-white border border-gray-700 rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-colors">
          Apply Range
        </button>
      </div>

      {/* Minimum Rating */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Minimum Rating</h3>
        <div className="flex flex-col gap-3 text-sm">
          {[{val: 4.5, label: '4.5 & up'}, {val: 4.0, label: '4.0 & up'}, {val: 3.0, label: '3.0 & up'}].map((rating) => (
            <label key={rating.val} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                ${filters.minRating === rating.val ? 'border-[#00C16A]' : 'border-gray-500 group-hover:border-gray-400'}`}>
                {filters.minRating === rating.val && <div className="w-2 h-2 rounded-full bg-[#00C16A]" />}
              </div>
              <input 
                type="radio" 
                name="minRating" 
                value={rating.val} 
                className="hidden"
                onChange={() => handleRatingChange(rating.val)}
                checked={filters.minRating === rating.val}
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= Math.floor(rating.val) ? (
                      <FaStar className="text-yellow-500" size={14} />
                    ) : star === Math.ceil(rating.val) && !Number.isInteger(rating.val) ? (
                      <FaStarHalfAlt className="text-yellow-500" size={14} />
                    ) : (
                      <FaRegStar className="text-yellow-500" size={14} />
                    )}
                  </span>
                ))}
              </div>
              <span className={filters.minRating === rating.val ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white transition-colors'}>
                {rating.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-4 border-t border-gray-800 pt-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sort By</h3>
        <select 
          name="sortBy"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="w-full bg-[#0B101E] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C16A] appearance-none cursor-pointer"
        >
          <option value="newest">Newest Releases</option>
          <option value="popular">Most Popular</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>

    </div>
  );
};

export default FilterSidebar;
