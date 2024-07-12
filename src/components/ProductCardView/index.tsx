import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../third-party/redux/fakestoreApi';
import { truncateString } from './../../utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import useCart from './../../hooks/useCart';

interface ProductCardViewProps {
  product: Product;
}

const ProductCardView: React.FC<ProductCardViewProps> = ({ product }) => {
  const navigate = useNavigate();

  const { cartItem, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity } =
    useCart(product);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <img alt="ecommerce" className="object-contain w-full h-48 p-4" src={product.image} />
      <div className="p-4">
        <h3 className="text-indigo-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{truncateString(product.title)}</h2>
        <p className="mt-1 text-green-600 font-semibold">${product.price.toFixed(2)}</p>
        <div className="flex items-center justify-between mt-4">
          {cartItem ? (
            <div className="flex items-center">
              <div className=" flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-sm outline-none bg-transparent rounded-md">
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
              className=" text-primary border border-primary  px-4 py-2 rounded hover:bg-primary hover:text-white hover:border-primary transition duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300"
            onClick={() => navigate(`products/${product.id}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardView;
