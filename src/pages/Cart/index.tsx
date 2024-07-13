// src/components/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../third-party/redux/store';
import { TrashIcon } from '@heroicons/react/24/outline';
import { truncateString } from './../../utils';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateCartQuantity } from '../../third-party/redux/reducers/cartReducer';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  return (
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="grid grid-cols-3 items-start gap-4">
                <div className="col-span-2 flex items-start gap-4">
                  <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                    <img
                      src={item.product.image}
                      className="w-full h-full object-contain cursor-pointer"
                      alt={item.product.title}
                      onClick={() => navigate(`/products/${item.product.id}`)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-gray-800">{truncateString(item.product.title)}</h3>
                    <button
                      type="button"
                      className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                      onClick={() => handleRemove(item.product.id)}
                    >
                      <TrashIcon height={25} />
                    </button>
                  </div>
                </div>
                <div className="ml-auto">
                  <h4 className="text-lg max-sm:text-base font-bold text-gray-800">${item.product.price.toFixed(2)}</h4>
                  <div className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                    <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</button>
                    <span className="mx-3 font-bold">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-md p-4 h-max">
          <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
            Order Summary
          </h3>
          <ul className="text-gray-800 mt-6 space-y-3">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{' '}
              <span className="ml-auto font-bold">
                ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax <span className="ml-auto font-bold">$0.00</span>
            </li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total
              <span className="ml-auto">
                ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
              </span>
            </li>
          </ul>
          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-primary hover:bg-primary-dark text-white rounded-md"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </button>
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
