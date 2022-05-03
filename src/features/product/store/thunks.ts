import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { Product } from './types';
export enum ProductListActionTypes {
    FetchProductsList = '@@products/list/FetchProductsList',
}
export enum ProductListApiEndpoints {
    fetchProductsList = '/ShoppingCart/GetAllProducts',
}

export const fetchProductsList = createAsyncThunk(ProductListActionTypes.FetchProductsList, async () => {
    const response = await api.get<Product[]>(`${ProductListApiEndpoints.fetchProductsList}`);
    return response.data;  
});