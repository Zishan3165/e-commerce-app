import React, { useState, useEffect } from 'react';

interface FilterComponentProps {
  onFilter: (priceRange: [number, number], sortOption: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = () => {
    if (minPrice < 0 || maxPrice < 0) {
      setError('Price cannot be negative');
    } else if (minPrice > maxPrice) {
      setError('Minimum price cannot be greater than maximum price');
    } else {
      setError(null);
      onFilter([minPrice, maxPrice], sortOption);
    }
  };

  useEffect(() => {
    handleFilterChange();
  }, [minPrice, maxPrice, sortOption]);

  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-medium mb-4">Filter Products</h3>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Sort By</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
