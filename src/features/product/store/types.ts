import { ErrorDetails } from "../../common/types";

export interface ProductListState extends ErrorDetails {
    products: Product[];
    isLoading: boolean;
}

export interface Product{
    id: string;
    name: string;
    unitPrice: number;
    imageUrl: string;
}