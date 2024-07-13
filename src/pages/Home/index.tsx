import React from 'react';
import ProductList from './../../components/ProductList';
import Categories from './Categories';
import Hero from './Hero';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Categories />
      <ProductList />
    </>
  );
};

export default Home;
