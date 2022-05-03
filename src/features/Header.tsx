import { Grid, Card, Typography, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCart } from "./cart/store/selectors";
import { calculateCosts } from "./cart/store/slice";
import { getConvertedCost } from "./common/utils";
import { CountrySelector } from "./countryselector/components/CountrySelector";
import { selectCountries } from "./countryselector/store/selectors";
import { Product } from "./product/store/types";
export type Props = {
    product: Product,
    key: number,
    onAdd: (itemToAdd: Product) => void,
}
export function Header() {
    const { items, totalCost } = useAppSelector(selectCart);
    const { selectedCountry } = useAppSelector(selectCountries);
    const [totalItems, setTotalItems] = useState(0);
    const dispatch = useAppDispatch();
    
    useEffect(()=>{
        setTotalItems(items.reduce((sum, current) => sum + current.quantity, 0));
        dispatch(calculateCosts());
    },[dispatch, items])

    return (
            <Card elevation={2}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <CountrySelector></CountrySelector>                        
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="right" style={{ padding: '10px' }}>Items in Cart: {totalItems}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="right" style={{ padding: '10px' }}>Total Price (excluding shipping): {getConvertedCost(totalCost, selectedCountry)}</Typography>
                        </Grid> 
                    </Grid>    
                </Grid>       
            </CardContent>
        </Card>
     );    
    }
