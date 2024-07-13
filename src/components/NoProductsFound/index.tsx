import React from 'react';

const NoProductsFound: React.FC = () => {
  return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-semibold text-gray-700">No Products Found</h2>
      <p className="text-gray-500 mt-2">Sorry, we couldn't find any products in this category.</p>
    </div>
  );
};

export default NoProductsFound;
