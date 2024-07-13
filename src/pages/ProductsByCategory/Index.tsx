import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetCategoryProductsQuery } from '../../third-party/redux/fakestoreApi';
import { Product } from '../../third-party/redux/fakestoreApi';
import Spinner from '../../components/Spinner';
import ProductCardView from '../../components/ProductCardView';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeEachWord } from '../../utils';
import NoProductsFound from '../../components/NoProductsFound';
import FilterComponent from '../../components/FilterComponent';

type RouteParams = {
  id: string;
};

const ProductsByCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();

  if (!id) {
    navigate('/');
  }

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;

  const { data: products = [], isLoading, isError } = useGetCategoryProductsQuery(id as string, { skip: !id });

  useEffect(() => {
    if (products.length > 0) {
      setAllProducts(products);
      setDisplayedProducts(products.slice(0, itemsPerPage));
    }
  }, [products]);

  const handleFilter = (priceRange: [number, number], sortOption: string) => {
    let filteredProducts = products.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    switch (sortOption) {
      case 'name-asc':
        filteredProducts = filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filteredProducts = filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setAllProducts(filteredProducts);
    setDisplayedProducts(filteredProducts.slice(0, itemsPerPage));
  };

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
    <section className="text-gray-600 body-font mt-2 min-h-[80vh]">
      <div className="flex flex-col text-center w-full">
        <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">{capitalizeEachWord(id || '')}</h2>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <FilterComponent onFilter={handleFilter} />
        {displayedProducts.length === 0 && !isLoading && (
          <div className="flex justify-center items-center">
            <NoProductsFound />
          </div>
        )}
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

export default ProductsByCategory;
