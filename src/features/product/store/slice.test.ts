import { AnyAction } from '@reduxjs/toolkit';
import { productSlice } from './slice';
import { ProductListState } from './types';

describe('productSlice', () => {
  const defaultState : ProductListState = {
    products: [],
    hasErrors: false,
    errorMessage: '',
    isLoading: true,
    };


    it('should return correct initial state', () => {
        // arrange
        const action: AnyAction = { type: 'Dummy' };
    
        // act
        const result = productSlice.reducer(undefined, action);
    
        // assert
        expect(result).toStrictEqual(defaultState);
      });
});
