import { Grid, Typography, TextField } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getConvertedCost } from "../../common/utils";
import { selectCountries } from "../../countryselector/store/selectors";
import { addItemToCart, removeItemFromCart } from "../store/slice";
import { CartItem } from "../store/types";

export type Props = {
    item: CartItem,
    key: string,
}
export function Item({item} : Props) {

    const dispatch = useAppDispatch();
    const { selectedCountry } = useAppSelector(selectCountries);
    
    const handleQuantityChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newVal = parseInt(event.target.value);
        if(isNaN(newVal)) return;
        
        if(newVal > item.quantity) dispatch(addItemToCart(item.product));
        if(newVal < item.quantity) dispatch(removeItemFromCart(item.product.id));
    };
     return (<Grid container style={{'border':'1px dashed grey', 'padding': '5px', marginBottom: '5px'}}>  
     <Grid container item  xs={2}></Grid>   
        <Grid container item  xs={2}>
         <img className="small" src={`${item.product.imageUrl}/50/50`} alt={item.product.name} />
     </Grid>
        <Grid container item xs={2}>
             <Typography>{item.product.name}</Typography>
         </Grid><Grid container item xs={2}>
             <Typography>${item.product.unitPrice}</Typography>
         </Grid>
         <Grid container item xs={2}>
             <TextField data-testid="quantity" type='number' value={item.quantity} onChange={handleQuantityChange}/>
         </Grid>
         <Grid container item xs={2}>
             <Typography>{getConvertedCost(item.totalPrice, selectedCountry)}</Typography>
         </Grid>
         </Grid>
     );    
    }