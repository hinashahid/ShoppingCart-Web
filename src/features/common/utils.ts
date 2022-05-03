import { Country } from "../countryselector/store/types";

export const getConvertedCost = (price: number, selectedCountry: Country | undefined) => {
    if(selectedCountry == null || selectedCountry === undefined) return `$${price}`;        
    return `${selectedCountry.symbol}${new Intl.NumberFormat().format(price * selectedCountry.exchangeRate)}`;
}