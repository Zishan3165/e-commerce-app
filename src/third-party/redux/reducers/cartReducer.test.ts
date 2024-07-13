import cartReducer, { addToCart, removeFromCart, updateCartQuantity, clearCart } from '../reducers/cartReducer';
import { Product } from '../fakestoreApi';

const product: Product = {
  id: 1,
  title: 'Sample Product',
  price: 100,
  description: 'Sample Description',
  category: 'electronics',
  image: 'sample.jpg',
  rating: { rate: 4.5, count: 10 },
};

describe('cart reducer', () => {
  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle addToCart', () => {
    const actual = cartReducer(undefined, addToCart(product));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].product).toEqual(product);
  });

  it('should handle removeFromCart', () => {
    const state = cartReducer(undefined, addToCart(product));
    const actual = cartReducer(state, removeFromCart(product.id));
    expect(actual.items).toHaveLength(0);
  });

  it('should handle updateCartQuantity', () => {
    const state = cartReducer(undefined, addToCart(product));
    const actual = cartReducer(state, updateCartQuantity({ id: product.id, quantity: 3 }));
    expect(actual.items[0].quantity).toEqual(3);
  });

  it('should handle clearCart', () => {
    const state = cartReducer(undefined, addToCart(product));
    const actual = cartReducer(state, clearCart());
    expect(actual.items).toHaveLength(0);
  });
});
