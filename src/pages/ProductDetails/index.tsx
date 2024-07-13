import React from 'react';
import { useParams } from 'react-router-dom';
import { Product, useGetProductByIdQuery } from './../../third-party/redux/fakestoreApi';
import useCart from '../../hooks/useCart';
import { TrashIcon } from '@heroicons/react/24/outline';
import Spinner from '../../components/Spinner';
import { capitalizeEachWord } from '../../utils';

type RouteParams = {
  id: string;
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const { data, error, isFetching } = useGetProductByIdQuery(id as string, { skip: !id });
  console.log(data);
  const { cartItem, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity } = useCart(
    data || ({} as Product),
  );

  if (!id) {
    return (
      <section className="bg-gray-100 py-12 flex items-center">
        <div className="container mx-auto">
          <p className="text-red-500">No product ID provided</p>
        </div>
      </section>
    );
  }

  if (isFetching) {
    return (
      <section className="bg-gray-100 py-12 h-[80vh] items-center flex">
        <div className="container mx-auto">
          <Spinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <p className="text-red-500">Error loading product details</p>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden min-h-[80vh]">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={data?.title || 'Image of a product'}
            className="lg:w-1/2 w-full lg:h-auto h-64  object-contain max-h-[600px] object-center rounded"
            src={data?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {capitalizeEachWord(data?.category || '')}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data?.title}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(Math.floor(data?.rating?.rate || 0))].map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                {[...Array(5 - Math.floor(data?.rating?.rate || 0))].map((_, i) => (
                  <svg
                    key={i}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">{data?.rating?.count} Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{data?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <div className="relative">
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="title-font font-medium text-2xl text-gray-900">${data?.price}</span>
              {cartItem ? (
                <div className="flex items-center">
                  <div className=" flex items-center px-3 py-2 border border-gray-300 text-gray-800 text-sm outline-none bg-transparent rounded-md">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span className="mx-3 font-bold">{cartItem.quantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                  <button
                    className="bg-red-500 text-white px-2 py-1 ml-4 rounded hover:bg-red-600 transition duration-300"
                    onClick={handleRemoveFromCart}
                  >
                    <TrashIcon height={25} />
                  </button>
                </div>
              ) : (
                <button
                  className="transition flex ml-auto text-primary border border-primary py-2 px-6 focus:outline-none hover:bg-primary hover:text-white hover:border-primary rounded"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
