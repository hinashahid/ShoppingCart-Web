import { Button, Grid, Typography,Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getConvertedCost } from "../../common/utils";
import { selectCountries } from "../../countryselector/store/selectors";
import { selectCart } from "../store/selectors";
import { resetOrderSuccess } from "../store/slice";
import { calculateShippingCost, placeOrder } from "../store/thunks";
import { OrderPayload } from "../store/types";
import { Item } from "./Item";

export function Cart() {
    const {items, totalCost, shippingCost, orderSuccessful} = useAppSelector(selectCart);
    const dispatch = useAppDispatch();
    const { selectedCountry } = useSelector(selectCountries);
    
    const handleClose = (event: any) => {
    dispatch(resetOrderSuccess());
    };
    const navigate = useNavigate();
    
    useEffect(()=>{
        dispatch(calculateShippingCost(totalCost));
    },[dispatch, totalCost])

    
    const handlePlaceOrder = () => {
        const order: OrderPayload = {
            items: [...items],
            currency: selectedCountry?.currency,
            exchangeRate: selectedCountry?.exchangeRate,
            shippingCost: shippingCost,
            totalCost: totalCost,
        };
        dispatch(placeOrder(order));
    }
    
    return (
        <>
        <Grid container spacing={2}>
        <Grid item xs={10}>
            <h2>Cart</h2>
        </Grid>
        <Grid item xs={2}>
            <Button color="primary" style={{backgroundColor: 'blue'}} variant="contained" onClick={() => { navigate('/'); }}>Go to Products</Button>         
        </Grid>
        </Grid>
        {items.length === 0 ? <Typography variant="h6" style={{color:"blueviolet"}}> There are no items in the cart.</Typography> :
        <Grid container>
            <Grid container style={{'border':'1px dashed grey', 'padding': '5px', marginBottom: '5px'}}>  
                <Grid container item  xs={4}>               
                </Grid>
                <Grid container item xs={2}>
                    <Typography variant="body1" color="primary">Product Name</Typography>
                </Grid>
                <Grid container item xs={2}>
                    <Typography variant="body1" color="primary">Unit Price</Typography>
                </Grid>
                <Grid container item xs={2}>
                    <Typography variant="body1" color="primary">Quantity</Typography>
                </Grid>
                <Grid container item xs={2}>
                    <Typography variant="body1" color="primary">Total Price</Typography>
                </Grid>
            </Grid>          
            {items.map((item) => (                
                <Item key={item.product.id} item={item}></Item>
            ))}            
            <Grid container style={{margin: '5px'}}>  
                <Grid container item  xs={8}>               
                </Grid>
                <Grid container item  xs={4}>
                    <Grid container item xs={6}>
                        <Typography variant="body1" color="primary">Items Cost({selectedCountry?.currency}):</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                        <Typography variant="body1" color="primary">{getConvertedCost(totalCost, selectedCountry)}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                        <Typography variant="body1" color="primary">Shipping Cost({selectedCountry?.currency}):</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                        <Typography variant="body1" color="primary">{getConvertedCost(shippingCost, selectedCountry)}</Typography>
                    </Grid>           
                    <Grid container item xs={6}>
                        <Typography variant="body1" color="primary">Coversion Rate:</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                        <Typography variant="body1" color="primary">{selectedCountry?.exchangeRate}</Typography>
                    </Grid>    
                    <Grid container item xs={6} style={{borderBottom: '2px solid black',borderTop: '2px solid black'}}>
                        <Typography variant="body1" color="primary">Total Cost({selectedCountry?.currency}):</Typography>
                    </Grid>
                    <Grid container item xs={6} style={{borderBottom: '2px solid black',borderTop: '2px solid black'}}>
                        <Typography variant="body1" color="primary">{getConvertedCost(totalCost + shippingCost, selectedCountry)}</Typography>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6} style ={{marginTop: '10px'}}>
                        <Button color="primary" style={{backgroundColor: 'green'}} variant="contained" onClick={handlePlaceOrder}>Place Order</Button>         
                    </Grid>                
                </Grid>
            </Grid>
        </Grid> }
      <Snackbar open={orderSuccessful} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Order Placed successfully
        </Alert>
      </Snackbar>
        </>
     );    
    }