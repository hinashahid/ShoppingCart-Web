import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { Country } from './types';
export enum CountrySelectorActionTypes {
    FetchCountriesList = '@@countries/list/FetchCountriesList',
}
export enum CountrySelectorApiEndpoints {
    fetchCountriesList = '/ShoppingCart/GetCountries',
}

export const fetchCountriesList = createAsyncThunk(CountrySelectorActionTypes.FetchCountriesList, async () => {
    const response = await api.get<Country[]>(`${CountrySelectorApiEndpoints.fetchCountriesList}`);
    return response.data;    
});