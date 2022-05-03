import { Grid, Card, Typography, Button, CardContent } from "@material-ui/core";
import { useAppSelector } from "../../../app/hooks";
import { getConvertedCost } from "../../common/utils";
import { selectCountries } from "../../countryselector/store/selectors";
import { Product } from "../store/types";

export type Props = {
    product: Product,
    key: string,
    onAdd: (itemToAdd: Product) => void,
}
export function ProductItem({product, onAdd} : Props) {
    const { selectedCountry } = useAppSelector(selectCountries);
    return (
        <Grid item xs={3}>
            <Card elevation={2}>
            <CardContent>
                <img className="small center" src={`${product.imageUrl}/200/200` }  style={{ padding: '10px' }} alt={product.name} />
                <Typography variant="h4" align="center" style={{ padding: '10px' }}>{product.name}</Typography>
                <Typography>{getConvertedCost(product.unitPrice, selectedCountry)}</Typography>
                <Button color="primary" style={{backgroundColor: 'blue'}} variant="contained" onClick={() => { onAdd(product) }}>Add To Cart</Button>
            </CardContent>
        </Card>
      </Grid>
     );    
    }