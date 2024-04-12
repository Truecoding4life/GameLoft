import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { ADD_LIKE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { DO_ERROR_ALERT , CLOSE_ALERT} from "../utils/actions";
import {
  CardMedia,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Rating,
} from "@mui/material";

import AuthService from "../utils/auth";
import { FavoriteBorder, Favorite, ExpandMore } from "@mui/icons-material";
const handleViewDetail = (id) => {
  window.location.href = `/products/${id}`;
};

export function ProductCard({
  name,
  _id,
  price,
  description,
  image,
  ratingArray,
  addToCart,
  discounted_price,
  likes
}) {
  const [state, dispatch] = useStoreContext();
  let userId;
  if(AuthService.loggedIn()){
    userId = AuthService.getProfile().data.userId
  }
  let temp = ratingArray || [];
  let productRating = () => {
    let rate = 0;
    for (let i = 0; i < temp.length; i++) {
      rate += temp[i];
    }
    return rate / temp.length;
  };
  let liked = false
  let length;
  if(likes.isArray){
    length = likes.length
  }
  let likeCount = length
  if(likeCount < length){
    likeCount = length
  }
  if(  userId ) {
    for( let i = 0; i < length; i++){
      if(likes[i]._id === userId){
        liked = true;
        break;
      } 
    
    }
  }
  

  const [addLike] = useMutation(ADD_LIKE);

  const handleAddLike = () => {
    if(userId == true){
      try {
       addLike({
        variables: { productId: _id , userId},
      });
    
      refetch()
    } catch (err) {
      console.error(err);
    }}
    else{
      dispatch({
        type: DO_ERROR_ALERT,
        errorAlert: "Please login to like this product",
      })
      setTimeout(() =>{
        dispatch({
          type: CLOSE_ALERT,
        })
      }, 3000)
    } 
  };
  return (
    <Card
      key={_id}
      className="flex-item shop-item"
      sx={{
        width: { xs: "96%", sm: "27%", md: "27%", lg: "20%", xl: "14%" },
        maxWidth: { sm: "70%", md: "50%" },
        borderRadius:3,
        backgroundColor: "var(--card-color)",
        color: "white",
        boxShadow: 4,
        margin: 0,
        padding: 0,
        position: "relative",
      }}
    >
      <Box className="like-display">
        {likeCount}
        { liked ? (
           <Checkbox
           icon={<FavoriteBorder sx={{color:'#d77286ef'}} />}
           checkedIcon={<Favorite  sx={{color:'#d77286ef'}}/>}
           disabled checked
           sx={{ margin: "auto" }}
         />
        ) :(
          <Checkbox
          icon={<FavoriteBorder sx={{color:'#d77286ef'}}  />}
          checkedIcon={<Favorite sx={{color:'#d77286ef'}} />}
          onChange={handleAddLike}
          sx={{ color: "currentColor", margin: "auto" }}
        />

        )}
      </Box>
      <CardMedia
        component="img"
        image={image}

        sx={{ maxHeight: 200 }}
        onClick={() => handleViewDetail(_id)}
      />

      <CardContent onClick={() => handleViewDetail(_id)}>
        <Typography variant="h5" sx={{ fontSize: 14, fontFamily: "Poppins" }}>
          {" "}
          {name}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: 17, fontFamily: "Poppins" }}>
          {" "}
          ${price}
        </Typography>
        {ratingArray.length ? (
          <Rating name="read-only" value={productRating()}  readOnly />
        ) : null}
      </CardContent>
      {/* <CardActions>
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          sx={{ color: "white", margin: "auto" }}
        />
        
      </CardActions> */}
      <CardActions>
      
        <Button
          sx={{ margin: "auto" }}
          onClick={() =>
            addToCart({ name, _id, price, description, quantity: 1, image, discounted_price })
          }
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
