import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../third-party/redux/store';
import { Product } from '../third-party/redux/fakestoreApi';
import { addToCart, removeFromCart, updateCartQuantity } from '../third-party/redux/reducers/cartReducer';

const useCart = (product: Product) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items.find((item) => item.product.id === product.id));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      dispatch(updateCartQuantity({ id: product.id, quantity: cartItem.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(updateCartQuantity({ id: product.id, quantity: cartItem.quantity - 1 }));
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  return {
    cartItem,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useCart;
