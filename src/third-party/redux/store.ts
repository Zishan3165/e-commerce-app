import { configureStore } from '@reduxjs/toolkit';
import { fakeStoreApi } from './fakestoreApi';
import cartReducer, { CartState } from './reducers/cartReducer';
import authReducer, { AuthState } from './reducers/authReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fakeStoreApi.middleware),
});

export type RootState = {
  cart: CartState;
  auth: AuthState;
  [fakeStoreApi.reducerPath]: ReturnType<typeof fakeStoreApi.reducer>;
};

export type AppDispatch = typeof store.dispatch;
