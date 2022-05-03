import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../product/store/types';
import { calculateShippingCost, placeOrder } from './thunks';
import { CartState } from './types';

const initialState: CartState = {
    items: [],
    hasErrors: false,
    errorMessage: '',
    isLoading: true,
    shippingCost: 0,
    totalCost: 0,
    orderSuccessful: false
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addItemToCart: (state, action: PayloadAction<Product>) => {
          const index = state.items.findIndex((item) => item.product?.id === action.payload.id);
          if(index >= 0){
              state.items[index].quantity += 1;
              state.items[index].totalPrice = state.items[index].product?.unitPrice * state.items[index]?.quantity;              
              calculateCosts();
              return;
          }
          state.items.push({
              product: action.payload,
              quantity: 1,
              totalPrice: action.payload.unitPrice
          });
          calculateCosts();
          state.orderSuccessful = false;
      },
      removeItemFromCart: (state, action: PayloadAction<string>) => {
        const index = state.items.findIndex((item) => item.product?.id === action.payload);        
        if(index >= 0){
            const quantity = state.items[index].quantity; 
            if(quantity === 1)
            {
                state.items.splice(index,1);
                calculateCosts();
                return;
            }
            state.items[index].quantity -= 1;
            state.items[index].totalPrice = state.items[index]?.product?.unitPrice * state.items[index].quantity;
            calculateCosts();
            state.orderSuccessful = false;
        }
    },
    calculateCosts: (state) => {
       const totalCost = state.items.reduce((sum, current) => sum + current.totalPrice, 0);
       state.totalCost = totalCost;       
    },
    resetOrderSuccess: (state) => {
      state.orderSuccessful = false;  
   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateShippingCost.fulfilled, (state, action) => {       
        state.shippingCost = action.payload;
      })
      .addCase(calculateShippingCost.rejected, (state, action) => {
        state.hasErrors = true;
        if(!!action.error?.message) state.errorMessage = action.error?.message;
      })
      .addCase(placeOrder.pending, (state, action) => {       
        state.orderSuccessful = false;      
      })
      .addCase(placeOrder.fulfilled, (state, action) => {       
        state.orderSuccessful = true;
        state.items = initialState.items;        
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.hasErrors = true;
        if(!!action.error?.message) state.errorMessage = action.error?.message;
      });
  }  
});
export const { addItemToCart, removeItemFromCart, calculateCosts, resetOrderSuccess } = cartSlice.actions;

export default cartSlice.reducer;