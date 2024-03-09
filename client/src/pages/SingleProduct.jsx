import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Rating,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { ADD_REVIEW } from "../utils/mutations";


const OneProductPage = () => {
  const { id } = useParams();
  const [ratingValue, setRating] = useState(null);

  const [rateSelect, setRateSelect] = useState("");
  const [addReview] = useMutation(ADD_REVIEW);
  const { data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { id: id },
  });

  const product = data?.product || {};
  console.log(product);

  const handleFormSubmit = async () => {
    try {
      await addReview({
        variables: { commentText: rateSelect, productId: id },
      });
      setRateSelect("");
    } catch (err) {
      console.error("Failed to add review", err);
      alert("Failed to add review");
    }
  };

  const handleRateSelectChange = (event) => {
    setRateSelect(event.target.value);
  };

  return (
    <Box className='single-product-page'>
      <Navbar />
      <Box padding={5} width={"70%"} height={"50%"} margin={"auto"}>
        {product ? (
          <Grid container spacing={2}>
            <Grid
              item
              sm={12}
              md={6}
              lg={4}
              
              
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ borderRadius: 20,height:'100%' , maxHeight:380}}
                className='product-image'
              />
            </Grid>

            <Grid item sm={12} md={6} lg={8} >
            
              <Grid item sm={12} md={12} lg={8} sx={{ paddingInline: 5 , backgroundColor:'#1e71a8f3', padding:3, borderRadius:5}}>
                  {" "}
                  

                 
                  <Typography fontFamily={'Poppins'} fontSize={23} color='white'> {product.name} </Typography>
                  {ratingValue ? (
                    <div>
                      <Typography component="legend" fontFamily={'Poppins'} fontSize={10} color='white'> Current rating</Typography>
                      <Rating name="read-only" value={ratingValue} readOnly />

                    </div>
                  ) : (
                    <div>
                      <Rating name="disabled" value={ratingValue} disabled />

                      <Typography component="legend" fontFamily={'Poppins'} fontSize={14} color='white'>
                        No rating given
                      </Typography>
                      <Typography fontFamily={'Poppins'} fontSize={10} color='white'>Rate now </Typography>
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                    </div>
                  )}
                  
                  <Typography fontFamily={'Fredoka'} fontSize={20} color='white'>More Detail</Typography>
                  <Typography
                    variant="body2"
                    fontFamily={'Poppins'} fontSize={13} color='white'
                    
                   overflow={'hidden'}
                    maxHeight={400}
                    
                   
                  >
                    {product.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
       
        ) : (
          <Box>
            <Typography variant="h4">No Product Found</Typography>
          </Box>
        )} 
      </Box>
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
