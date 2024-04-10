import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Rating,
  Stack,
  Button
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { ADD_RATING } from "../utils/mutations";
import { Sidebar } from "../components/Sidebar";
import './style.css'
import '../components/spiner.css'
import { useStoreContext } from "../utils/GlobalState";
import { DO_SUCCESS_ALERT, CLOSE_ALERT } from "../utils/actions";

const OneProductPage = () => {

  const [ state, dispatch ] = useStoreContext();
  const { id } = useParams();
  const [ratingValue, setRating] = useState(null);

  const [addRating] = useMutation(ADD_RATING);
  const { data, loading } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { id: id },
  });

  const product = data?.product || {};
  const productRateArray = product?.rating || [];
  let productRating = () => {
    let rate = 0;
    for (let i = 0; i < productRateArray.length; i++) {
      rate += productRateArray[i];
    }
    return rate / productRateArray.length;
  }

  const handleRatingSubmit = async (ratingValue) => {
    try {
      await addRating({
        variables: { productId: id, rating: ratingValue },
      });
      dispatch({
        type: DO_SUCCESS_ALERT,
        successAlert: "Thank you for submit your rate",
      })
      setTimeout(() =>{
        dispatch({
          type: CLOSE_ALERT,
        })
      }, 3000)
      
    } catch (err) {
      console.error("Failed to add review", err);
      alert("Failed to add review");
    }
  };



  return (
    <Box className='single-product-page' sx={{ height: '100%' }}>
      <Navbar />

      <Stack direction="row" spacing={3} style={{ minHeight: '100vh' }}>
        <Sidebar flex={1} />


        {data && (
          <Box flex={4}>
            <Grid container id="item-info" sx={{ margin: 0, padding: 0 }} >
              <Grid item xs={12} sm={12} md={12} lg={4} sx={{ height: 'fit-content' }}>

                <Box sx={{ marginBottom: 1 }} display='flex' alignItems='center' flexDirection='column' gap={1} marginTop='10%'>
                  <img
                    src={product.image}
                    alt={product.name}

                    style={{ borderRadius: 14, height: '100%', maxHeight: 300 }}
                    className='product-image product-info'
                  />

                  <Typography fontFamily={'Fredoka'} fontSize={20} color='white'>Current Rating  </Typography>

                  <Rating name="read-only" value={productRating()} readOnly />

                </Box>


              </Grid>
              <Grid item sm={12} md={12} lg={8} sx={{ height: 'fit-content' }}  >
                {" "}

                <Box className=' product-info product-description' sx={{ backgroundColor: 'var(--item-description-box)', padding: 3, borderRadius: 5, height: 'fit-content', marginTop: '20px', maxWidth: '90%' }}>



                  <Typography fontFamily={'Poppins'} fontSize={23} color='white'> {product.name} </Typography>


                  <Typography fontFamily={'Fredoka'} fontSize={20} color='white'>Description</Typography>
                  <Typography
                    variant="body2"
                    fontFamily={'Poppins'} fontSize={13} color='white'
                    sx={{ maxWidth: 900 }}
                    overflow={'hidden'}
                    maxHeight={400}


                  >
                    {product.description}
                  </Typography>
                </Box>

                <Box className='rating-box'>
                  <Typography variant="p" className="item-review">Give this product a rating </Typography>
                  {ratingValue ? (
                    <Typography fontFamily={'Fredoka'} fontSize={20} color='white'> Thank you for submit your rate </Typography>

                  ) : (
                    <div>

                      <Typography fontFamily={'Fredoka'} fontSize={20} color='white'>Tell us how much you enjoy this game  </Typography>

                      <Typography fontFamily={'Poppins'} fontSize={10} color='white'>Click here </Typography>
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
                </Box>
                <Box className='rating-box'>
                  <Typography variant="p" className="item-review">Write Review </Typography>
                  
                    <div>
                      <Typography fontFamily={'Fredoka'} fontSize={20} color='white'>This feature is still under development </Typography>
                      <textarea className="item-review-input" rows="4"></textarea>

                     <Button > Send </Button>
                    </div>
                  
                </Box>
              </Grid>


            </Grid>

            <Grid container>
              <Grid item sm={12} md={12} lg={12}  >

              </Grid>
            </Grid>
          </Box>
        )} {loading && (
          <Box flex={4}>
            <Typography variant="h4" className="spinner"></Typography>
          </Box>
        )}






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
