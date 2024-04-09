import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Rating,
  Stack
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { ADD_RATING } from "../utils/mutations";
import { Sidebar } from "../components/Sidebar";


const OneProductPage = () => {
  const { id } = useParams();
  const [ratingValue, setRating] = useState(null);

  const [addRating] = useMutation(ADD_RATING);
  const { data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { id: id },
  });

  const product = data?.product || {};
  const productRateArray = product?.rating || [];
  let productRating = ()=>{
    let rate = 0;
    for( let i =0; i<productRateArray.length; i++){
      rate += productRateArray[i];
    }
    return rate / productRateArray.length;
  }
  
  const handleRatingSubmit = async (ratingValue) => {
    try {
      await addRating({
        variables: { productId: id ,rating: ratingValue },
      });
    } catch (err) {
      console.error("Failed to add review", err);
      alert("Failed to add review");
    }
  };

 

  return (
    <Box className='single-product-page' sx={{height:'100%'}}>
      <Navbar />

      <Stack direction="row" spacing={3} justifyContent="space-between" style={{minHeight:'100vh'}}>
        <Sidebar flex={1} />

        <Box padding={0}  margin={0} flex={4} >
        {product ? (
        
            <>
             <Box   sx={{marginBottom:1}}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ borderRadius: 14, height: '100%', maxHeight: 300 }}
                    className='product-image'
                  />
                  <Typography component="legend" fontFamily={'Poppins'} fontSize={10} color='white'> Current rating</Typography>
                  <Rating name="read-only" value={productRating()} readOnly />
                </Box>

        
            
              <div item sm={12} md={12} lg={12} sx={{  backgroundColor:'#4949a1cc', padding:3, borderRadius:5, height:'100%'}}>
                  {" "}
                  

                 
                  <Typography fontFamily={'Poppins'} fontSize={23} color='white'> {product.name} </Typography>
                  {ratingValue ? (
                    <div>
                      <Typography component="legend" fontFamily={'Poppins'} fontSize={10} color='white'> Current rating</Typography>
                      <Rating name="read-only" value={productRating()} readOnly />

                    </div>
                  ) : (
                    <div>

                      
                      <Typography fontFamily={'Poppins'} fontSize={10} color='white'>Rate now </Typography>
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    
                    onChange={(event, newValue) => {
                      setRating(newValue);
                      handleRatingSubmit(newValue);
                    }}
                  />
                    </div>
                  )}
                  
                  <Typography fontFamily={'Fredoka'} fontSize={20} color='white'>More Detail</Typography>
                  <Typography
                    variant="body2"
                    fontFamily={'Poppins'} fontSize={13} color='white'
                    sx={{maxWidth:900}}
                   overflow={'hidden'}
                    maxHeight={400}
                    
                   
                  >
                    {product.description}
                  </Typography>
                </div>
         
         </>
       
        ) : (
          <Box>
            <Typography variant="h4">No Product Found</Typography>
          </Box>
        )} 
      </Box>


       
      </Stack>
     
    </Box>
  );
};

export default OneProductPage;

/* Rate this game

 <FormControl sx={{ m: 1, width: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Rate</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="rateSelect"
                  label="Rate"
                  value={rateSelect}
                  onChange={handleRateSelectChange}
                >
                  <MenuItem value="LOVE THIS GAME">LOVE THIS GAME</MenuItem>
                  <MenuItem value="NOT GOOD ENOUGH">NOT GOOD ENOUGH</MenuItem>
                  <MenuItem value="WAY TOO BAD">WAY TOO BAD</MenuItem>
                </Select>
                <FormHelperText>You will not be able to delete your review</FormHelperText>
              </FormControl>

              <Button
                variant="contained"
                color="success"
                onClick={handleFormSubmit}
                sx={{ width: '100%' }}
              >
                Submit
              </Button>

*/
