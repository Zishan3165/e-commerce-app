import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { useGetProductsQuery } from '../../third-party/redux/fakestoreApi';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const { data: products = [], isLoading } = useGetProductsQuery();
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    if (debouncedQuery) {
      setPopoverVisible(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      setPopoverVisible(true);
    } else {
      setPopoverVisible(false);
    }
  }, [debouncedQuery]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <div className="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden mx-auto font-[sans-serif]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192.904 192.904"
        width="16px"
        className="fill-gray-600 mr-3 rotate-90"
      >
        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
      </svg>
      <input
        type="text"
        placeholder="Search Products..."
        className="w-full outline-none bg-transparent text-gray-600 text-sm"
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      {popoverVisible && (
        <div
          ref={popoverRef}
          className="absolute left-0 top-full w-full bg-white shadow-lg rounded-md z-10 max-h-[500px] overflow-y-scroll"
        >
          {isLoading ? (
            <div className="px-4 py-2 text-gray-700">
              <Spinner />
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                onClick={() => setPopoverVisible(false)}
              >
                <img src={product.image} alt={product.title} className="w-10 h-10 object-cover mr-3" />
                <span className="text-gray-700">{product.title}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
