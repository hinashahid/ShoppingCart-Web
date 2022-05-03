import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCountriesList } from './thunks';
import { Country, CountrySelectorState } from './types';

const initialState: CountrySelectorState = {
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

export const countrySelectorSlice = createSlice({
  name: 'countrySelector',
  initialState,
  reducers: {
    setSelectedCountry: (state, action: PayloadAction<Country>) => {
       state.selectedCountry = action.payload;
    },
    resetSelectedCountry: (state) => {
        state.selectedCountry = initialState.selectedCountry;
     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCountriesList.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.isLoading = false;
        state.hasErrors = false;
      })
      .addCase(fetchCountriesList.rejected, (state, action) => {
        state.hasErrors = true;
        if(!!action.error?.message) state.errorMessage = action.error?.message;
      });
  },
});
export const { setSelectedCountry, resetSelectedCountry } = countrySelectorSlice.actions;
export default countrySelectorSlice.reducer;