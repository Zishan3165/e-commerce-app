import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../third-party/redux/store';
import { Product } from '../third-party/redux/fakestoreApi';
import { addToCart, removeFromCart, updateCartQuantity, clearCart } from '../third-party/redux/reducers/cartReducer';

const useCartManager = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    if (cartItem) {
      dispatch(updateCartQuantity({ id: productId, quantity: cartItem.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      dispatch(updateCartQuantity({ id: productId, quantity: cartItem.quantity - 1 }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleClearCart,
  };
};

export default useCartManager;
