import React from 'react';
import ProductList from './../../components/ProductList';
import Categories from './Categories';

const Home: React.FC = () => {
  return (
    <>
      <Categories />
      <ProductList />
    </>
  );
};

export default Home;
