import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { OrderPayload } from './types';

export enum CartActionTypes {
    CalculateShippingCost = '@@cart/CalculateShippingCost',
    PlaceOrder = '@@cart/PlaceOrder',
}
export enum CartApiEndpoints {
    calculateShippingCost = '/ShoppingCart/CalculateShippingCost',
    placeOder = '/ShoppingCart/PlaceOrder',
}

export const calculateShippingCost = createAsyncThunk(CartActionTypes.CalculateShippingCost, async (totalCost: number) => {
    const response = await api.get<number>(`${CartApiEndpoints.calculateShippingCost}?totalCost=${totalCost}`);
    return response.data;       
});

export const placeOrder = createAsyncThunk(CartActionTypes.PlaceOrder, async (payload: OrderPayload) => {
    await api.post(`${CartApiEndpoints.placeOder}`,payload);
});