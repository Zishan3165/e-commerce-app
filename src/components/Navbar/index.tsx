import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useGetCategoriesQuery } from '../../third-party/redux/fakestoreApi';
import { capitalizeEachWord } from './../../utils/index';
import { useSelector } from 'react-redux';
import { RootState } from 'third-party/redux/store';
import useAuth from '../../hooks/useAuth';
import Search from './Search';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItem.reduce((acc, curr) => acc + curr.quantity, 0);
  const { isAuthenticated, logoutUser } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 shadow-sm bg-white sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="text-xl font-bold text-gray-700">
            Z-Store
          </Link>
          <button className="lg:hidden px-2 text-gray-700 hover:text-primary focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        <nav className={`lg:flex items-center space-x-6 w-full lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center text-gray-700 hover:text-primary transition lg:hidden"
            >
              Categories
              <Bars3Icon className="ml-1 h-5 w-5" />
            </button>
            {isMenuOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMenu}>
                <div
                  className="fixed left-0 top-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 p-4 transform transition-transform duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="text-gray-700 hover:text-primary focus:outline-none mb-4" onClick={toggleMenu}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <div className="space-y-4">
                    {isLoading && <div className="text-gray-700">Loading...</div>}
                    {error && <div className="text-red-500">Error loading categories</div>}
                    {categories?.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category}`}
                        className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                        onClick={toggleMenu}
                      >
                        {capitalizeEachWord(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        <Search />
        <div className="flex items-center space-x-4 mt-4 lg:mt-0 lg:ml-auto">
          <Link to="/cart" className="text-center text-gray-700 hover:text-primary transition relative">
            <div className="text-2xl">
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
            <div className="text-xs leading-3">Cart</div>
            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {totalQuantity}
            </div>
          </Link>
          {isAuthenticated ? (
            <button onClick={logoutUser} className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl flex justify-center">
                <UserIcon className="h-6 w-6" />
              </div>
              <div className="text-xs leading-3">Logout</div>
            </button>
          ) : (
            <Link to="/login" className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl flex justify-center">
                <UserIcon className="h-6 w-6" />
              </div>
              <div className="text-xs leading-3">Login</div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
