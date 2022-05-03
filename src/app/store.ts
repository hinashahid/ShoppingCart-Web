import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/product/store/slice';
import cartReducer from '../features/cart/store/slice';
import countrySelectorReducer from '../features/countryselector/store/slice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    countrySelector: countrySelectorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
