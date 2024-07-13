import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetProductsQuery } from '../../third-party/redux/fakestoreApi';
import ProductCardView from '../ProductCardView';
import { Product } from '../../third-party/redux/fakestoreApi';
import Spinner from '../../components/Spinner';

const ProductList: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;

  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  useEffect(() => {
    if (products.length > 0) {
      setAllProducts(products);
      setDisplayedProducts(products.slice(0, itemsPerPage));
    }
  }, [products]);

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    const newDisplayedProducts = allProducts.slice(0, (nextPage + 1) * itemsPerPage);
    setDisplayedProducts(newDisplayedProducts);
    setPage(nextPage);
  };

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreProducts();
    }
  }, [inView, isLoading]);

  useEffect(() => {
    if (allProducts.length > 0) {
      loadMoreProducts();
    }
  }, [allProducts]);

  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col text-center w-full">
        <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Popular Products</h2>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCardView product={product} key={product.id} />
          ))}
        </div>
        <div ref={ref} className="h-20"></div>
        {isLoading && <Spinner />}
        {isError && <div>Error loading products</div>}
      </div>
    </section>
  );
};

export default ProductList;
