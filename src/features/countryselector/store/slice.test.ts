import { AnyAction } from '@reduxjs/toolkit';
import { countrySelectorSlice } from './slice';
import { Country, CountrySelectorState } from './types';

describe('productSlice', () => {
  const defaultState : CountrySelectorState = {
    countries:[],
    selectedCountry: {
        id: -1,
        name: 'Australia',
        currency: 'AUD',
        exchangeRate: 1,
        symbol: '$'
    },
    hasErrors: false,
    errorMessage: '',
    isLoading: true,
    };


    it('should return correct initial state', () => {
        // arrange
        const action: AnyAction = { type: 'Dummy' };
    
        // act
        const result = countrySelectorSlice.reducer(undefined, action);
    
        // assert
        expect(result).toStrictEqual(defaultState);
      });

      it('should set the selectedCountry', () => {
        // arrange
        const payload: Country = {
            id: 1,
            name: 'Australia',
            currency: 'AUD',
            symbol: '$',
            exchangeRate: 1,
          };
    
        const action = countrySelectorSlice.actions.setSelectedCountry(payload);
    
        // act
        const result = countrySelectorSlice.reducer(defaultState, action);
    
        // assert
        expect(result).toStrictEqual({
          ...defaultState,
          selectedCountry: {
            id: 1,
            name: 'Australia',
            currency: 'AUD',
            symbol: '$',
            exchangeRate: 1,
          },
        });
      });
      it('should reset the selectedCountry', () => {
        // arrange
        const action = countrySelectorSlice.actions.resetSelectedCountry();
    
        // act
        const result = countrySelectorSlice.reducer(defaultState, action);
    
        // assert
        expect(result).toStrictEqual({
          ...defaultState
        });
      });
});
