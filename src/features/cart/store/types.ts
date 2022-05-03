import { ErrorDetails } from "../../common/types";
import { Product } from "../../product/store/types";

export interface CartState extends ErrorDetails {
    isLoading: boolean;
    items: CartItem[];  
    shippingCost: number;
    totalCost: number;
    orderSuccessful: boolean;
}

export interface CartItem{
    product: Product,
    quantity: number,
    totalPrice: number,    
}

export interface OrderPayload {
    items: CartItem[],
    shippingCost: number;
    totalCost: number;
    currency: string | undefined;
    exchangeRate: number| undefined;
}