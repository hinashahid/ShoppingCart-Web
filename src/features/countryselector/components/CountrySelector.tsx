import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCountries } from "../store/selectors";
import { fetchCountriesList } from "../store/thunks";
import { Box, TextField,  }from '@material-ui/core';
import { setSelectedCountry, resetSelectedCountry } from "./../store/slice";
import { Country } from "../store/types";
import { Autocomplete } from "@mui/material";
export function CountrySelector() {
    const {countries, isLoading} = useAppSelector(selectCountries);
    const dispatch = useAppDispatch();  
    
    useEffect(()=>{
        dispatch(fetchCountriesList());    
    },[dispatch]);

    const onOptionChange = (value : Country | null) => {
        if(value === null || value === undefined ) {
            dispatch(resetSelectedCountry());
            return;
        }
        dispatch(setSelectedCountry(value));
    }

    if(!!isLoading) return <div>...Loading</div>
    return (
        <Box>
            <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={countries}
                onChange={(event, value) => onOptionChange(value)}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                <Box component="li" {...props}>          
                    {option.name}
                </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"          
        />
      )}
    /></Box>
     );    
    }