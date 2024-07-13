import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import useCartManager from '../../hooks/useCartManager';
import { CartItem } from '../../third-party/redux/reducers/cartReducer';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
}

const Checkout: React.FC = () => {
  const [checkoutFormData, setCheckoutFormData] = useState<FormValues>();
  const [cartData, setCardData] = useState<CartItem[]>();
  const { cartItems, handleClearCart } = useCartManager();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setCheckoutFormData(data);
    setCardData(cartItems);
    handleClearCart();
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      console.log('No items in the cart, redirecting to home page.');
      navigate('/');
    }
  }, [cartItems, navigate]);

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full justify-center min-h-[80vh]">
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <div className="font-[sans-serif] bg-white">
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
              <div className="max-w-4xl w-full bg-gray-100 rounded-md p-8 shadow-md">
                {checkoutFormData && cartData ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex justify-center items-center gap-2">
                      <CheckCircleIcon height={30} /> Thank you for your order!
                    </h2>
                    <p className="text-gray-700 mb-6">Your order has been placed successfully. Here are the details:</p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                      <ul className="text-gray-700">
                        {cartData.map((item, index) => (
                          <li key={index} className="flex justify-between py-2 border-b border-gray-300">
                            <span>
                              {item.product.title} x {item.quantity}
                            </span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Shipping Details</h3>
                      <p className="text-gray-700">
                        {checkoutFormData.firstName} {checkoutFormData.lastName}
                        <br />
                        {checkoutFormData.addressLine}
                        <br />
                        {checkoutFormData.city}, {checkoutFormData.state} {checkoutFormData.zipCode}
                        <br />
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Total Amount</h3>
                      <p className="text-gray-700 font-bold">
                        ${cartData.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                      </p>
                    </div>

                    <button
                      className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
                    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <input
                              {...register('firstName', { required: 'First Name is required' })}
                              type="text"
                              placeholder="First Name"
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.firstName && (
                              <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                            )}
                          </div>
                          <div>
                            <input
                              {...register('lastName', { required: 'Last Name is required' })}
                              type="text"
                              placeholder="Last Name"
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
                          </div>
                          <div>
                            <input
                              {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                              })}
                              type="email"
                              placeholder="Email"
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                          </div>
                          <div>
                            <input
                              {...register('phoneNo', {
                                required: 'Phone Number is required',
                                pattern: { value: /^[0-9]+$/, message: 'Invalid phone number' },
                              })}
                              type="tel"
                              placeholder="Phone No."
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.phoneNo && <span className="text-red-500 text-sm">{errors.phoneNo.message}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <input
                              {...register('addressLine', { required: 'Address Line is required' })}
                              type="text"
                              placeholder="Address Line"
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.addressLine && (
                              <span className="text-red-500 text-sm">{errors.addressLine.message}</span>
                            )}
                          </div>
                          <div>
                            <input
                              {...register('city', { required: 'City is required' })}
                              type="text"
                              placeholder="City"
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                          </div>
                          <div>
                            <input
                              {...register('state', { required: 'State is required' })}
                              type="text"
                              placeholder="State"
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
                          </div>
                          <div>
                            <input
                              {...register('zipCode', { required: 'Zip Code is required' })}
                              type="text"
                              placeholder="Zip Code"
                              className="px-4 py-3 bg-white border border-gray-300 focus:bg-transparent focus:border-primary focus:ring-primary focus:ring-2 text-gray-800 w-full text-sm rounded-md focus:outline-none"
                            />
                            {errors.zipCode && <span className="text-red-500 text-sm">{errors.zipCode.message}</span>}
                          </div>
                        </div>

                        <div className="flex gap-4 max-md:flex-col mt-8">
                          <button
                            type="submit"
                            className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-primary hover:bg-primary-dark text-white"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
