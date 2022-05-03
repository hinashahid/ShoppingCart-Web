import { ErrorDetails } from "../../common/types";

export interface CountrySelectorState extends ErrorDetails {
    countries: Country[];
    selectedCountry: Country | undefined;
    isLoading: boolean;
}

export interface Country{
    id: number;
    name: string;
    currency: string;
    symbol: string;
    exchangeRate: number;
}