import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useQuery} from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../utils/queries';
import { Paper, Box, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";


export default function LiveSearch() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.products || [];

  const [selectedProduct, setSelectedProduct] = useState(null);
 

  useEffect(() => {
    if (selectedProduct){
      window.location.href = '/products/' + selectedProduct._id;
      
    }
  }, [selectedProduct])
  return (

    <React.Fragment
   >
      <div id="search-bar" >
        
      <Box sx={{ position: 'relative' }} >
          <Autocomplete
            value={selectedProduct}
            id="auto-complete"
            size="medium"
            
            onChange={(event, newValue) => {
              setSelectedProduct(newValue);
            }}
            options={products}
            
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
            renderInput={(params) => (
              <TextField
              placeholder="Search"
                {...params}
                sx={{
                  fontFamily: 'Poppins',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent', // Remove the border color when focused
                    },},
                    
                }}
            
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
      </div>
    </React.Fragment>
  );
}