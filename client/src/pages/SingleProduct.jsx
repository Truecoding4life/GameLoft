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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { ADD_REVIEW } from "../utils/mutations";

const OneProductPage = () => {
  const { id } = useParams();
  const [rateSelect, setRateSelect] = useState("");
  const  [addReview]  = useMutation(ADD_REVIEW);
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
    <Box >
      <Navbar />
      <Box
      padding={5}
      width={'90%'}
      height={'50%'}
  
     
     
      margin={'auto'}
     
      >
    
      {product ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} justifyContent="center" alignItems="center">
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
              
            />
          </Grid>

          <Grid  item xs={12} md={8} spacing={4}>
            <Grid container > 
            
            <Grid item xs={12}>
               <Typography
              variant="h4"
              align="center"
              id="productInfo"
              sx={{ padding: 5 }}
            >
              More Detail
            </Typography>
               </Grid>
           
            <Grid item xs={12} paddingInline={46} >
              <Typography variant="h5"  > Description </Typography>
              <Typography
                variant="body2"
                className="game-description-single-game"
               
              >
                {product.description}
              </Typography>
            </Grid >
            <Grid item xs={5} margin={'auto'} paddingTop={10}>
              <TableContainer component={Paper}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Review</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {product.reviews ? (
                      product.reviews.map((review, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {review.user}
                          </TableCell>
                          <TableCell align="right">{review.rate}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={1}>No Review</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Rate
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="rateSelect"
                  label="Rate"
                  value={rateSelect}
                  
                  onChange={handleRateSelectChange}
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
                <FormHelperText>
                  You will not be able to delete your review
                </FormHelperText>
              </FormControl>

              <Button
                variant="contained"
                color="success"
                onClick={handleFormSubmit}
                sx={{ width: "100%" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
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
