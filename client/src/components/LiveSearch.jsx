import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useQuery} from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../utils/queries';


export default function FreeSoloCreateOptionDialog() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.products || [];
  console.log(products);

  const [selectedProduct, setSelectedProduct] = useState(null);
 

  useEffect(() => {
    if (selectedProduct){
      window.location.href = '/products/' + selectedProduct._id;
      console.log(selectedProduct)
    }
  }, [selectedProduct])
  return (

    <React.Fragment>
      <div id="search-bar">
        <Autocomplete
          value={selectedProduct}
          onChange={(event, newValue) => {
            setSelectedProduct(newValue);
          }}
          options={products}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </div>
    </React.Fragment>
  );
}