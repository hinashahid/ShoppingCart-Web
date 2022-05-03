import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectProducts } from "../store/selectors";
import { fetchProductsList } from "../store/thunks";
import { ProductItem } from "./ProductItem";
import { Grid, Box, Button }from '@material-ui/core';
import { addItemToCart } from "../../cart/store/slice";
import { Product } from "../store/types";
import { useNavigate } from "react-router-dom";
export function ProductList() {
    const {products, isLoading} = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();    
    const navigate = useNavigate ();    
    
    useEffect(()=>{
        dispatch(fetchProductsList());
    },[dispatch]);

    const AddItemToCart = (item: Product) => {
        dispatch(addItemToCart(item));
    }

    if(!!isLoading) return <div>...Loading</div>
    return (
        <Box>
        <Grid container spacing={2}>
        <Grid item xs={10}>
            <h2>Products</h2>
        </Grid>
        <Grid item xs={2}>
            <Button color="primary" style={{backgroundColor: 'blue'}} variant="contained" onClick={() => { navigate('/checkout'); }}>Go to Basket</Button>         
        </Grid>
        </Grid>
        <Grid container spacing={2}>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} onAdd={AddItemToCart}></ProductItem>
            ))}
        </Grid>
        </Box>
     );    
    }