import React from 'react';
import ProductList from './../../components/ProductList';

const Home: React.FC = () => {
  return (
    <>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-start mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Discover the Latest Trends
            </h1>
            <p className="text-gray-700 mb-6">
              Shop our new arrivals from your favorite brands with exclusive discounts.
            </p>
            <a
              href="#shop"
              className="bg-primary text-white py-3 px-6 rounded-md hover:bg-transparent hover:text-primary border border-primary transition"
            >
              Shop Now
            </a>
          </div>
          <div className="md:w-1/2">
            <img src="https://via.placeholder.com/500x300" alt="Hero" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        </div>
      </section>
      <ProductList />
    </>
  );
};

export default Home;
