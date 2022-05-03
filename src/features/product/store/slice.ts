import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsList } from './thunks';
import { ProductListState } from './types';

const initialState: ProductListState = {
    products: [],
    hasErrors: false,
    errorMessage: '',
    isLoading: true,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.hasErrors = false;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.hasErrors = true;
        if(!!action.error?.message) state.errorMessage = action.error?.message;
      });
  },
});

export default productSlice.reducer;