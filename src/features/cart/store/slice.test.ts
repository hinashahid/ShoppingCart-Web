import { AnyAction } from '@reduxjs/toolkit';
import { Product } from '../../product/store/types';
import { cartSlice } from './slice';
import { CartState } from './types';

describe('productSlice', () => {
  const defaultState : CartState = {
    items: [],
    hasErrors: false,
    errorMessage: '',
    isLoading: true,
    shippingCost: 0,
    totalCost: 0,
    orderSuccessful: false
  };


    it('should return correct initial state', () => {
        // arrange
        const action: AnyAction = { type: 'Dummy' };
    
        // act
        const result = cartSlice.reducer(undefined, action);
    
        // assert
        expect(result).toStrictEqual(defaultState);
      });

      it('should add item to the cart', () => {
        // arrange
        const payload: Product = {
            id: 'id1',
            name: 'product1',
            unitPrice: 1,
            imageUrl: 'test',
        };
    
        const action = cartSlice.actions.addItemToCart(payload);    
        // act
        const result = cartSlice.reducer(defaultState, action);
    
        // assert
        expect(result).toStrictEqual({
          ...defaultState,
          items: [
            {
            product:{
                id: 'id1',
                name: 'product1',
                unitPrice: 1,
                imageUrl: 'test',
            },
            quantity: 1,
            totalPrice: 1
            }]
        });
      });
      it('should remove item from cart', () => {
        const state: CartState = {
            ...defaultState,
            items:[
                {
                    product: {
                    id: 'id1',
                    name: 'product1',
                    unitPrice: 10,
                    imageUrl: 'test',
                    },
                    quantity: 10,
                    totalPrice: 100,
                }
            ]
        }
        // arrange
        const action = cartSlice.actions.removeItemFromCart('id1');
    
        // act
        const result = cartSlice.reducer(state, action);
    
        // assert
        expect(result).toStrictEqual({
          ...defaultState,
          items:[{
            product: {
            id: 'id1',
            name: 'product1',
            unitPrice: 10,
            imageUrl: 'test',
            },
            quantity: 9,
            totalPrice: 90,
        }]
        });
      });
});
