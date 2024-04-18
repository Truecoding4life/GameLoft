import React from "react";
import { ADD_LIKE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import {
  CardMedia,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Rating,
  Box,
  Button,
  Typography,
} from "@mui/material";

import AuthService from "../utils/auth";
import { FavoriteBorder, Favorite, ExpandMore } from "@mui/icons-material";

import { updateCartQuantity, addToCart } from "../utils/feature/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setErrorAlert,
  setSuccessAlert,
  clearAlert,
} from "../utils/feature/alertSlice";

const handleViewDetail = (id) => {
  window.location.href = `/products/${id}`;
};

export function ProductCard({ product, handleAddToCart, refetch }) {
  const _id = product._id;
  const name = product.name;
  const price = product.price;
  const discounted_price = product.discounted_price;
  const ratingArray = product.rating;
  const description = product.description;
  const image = product.image;
  const category = product.category;
  const likes = product.likes;
  const dispatch = useDispatch();
  let userId;
  if (AuthService.loggedIn()) {
    userId = AuthService.getProfile().data.userId;
  }

  let temp = ratingArray || [];
  let productRating = () => {
    let rate = 0;
    for (let i = 0; i < temp.length; i++) {
      rate += temp[i];
    }
    return rate / temp.length;
  };
  let liked = false;
  let likeCount;

  if (Array.isArray(likes)) {
    if (likeCount !== likes.length) {
      likeCount = likes.length;
    }
  }

  if (userId) {
    for (let i = 0; i < likeCount; i++) {
      if (likes[i]._id === userId) {
        liked = true;
        break;
      }
    }
  }

  const [addLike] = useMutation(ADD_LIKE);

  const handleAddLike = () => {
    if (userId !== undefined && liked === false) {
      try {
        addLike({
          variables: { productId: _id, userId },
        });
        refetch();
      } catch (err) {
        console.error(err);
      }
    } else {
      dispatch(setErrorAlert("Please login to like this product"));
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }
  };
  return (
    <Card
      key={_id}
      className="flex-item shop-item"
      sx={{
        width: { xs: "96%", sm: "27%", md: "27%", lg: "20%", xl: "14%" },
        maxWidth: { sm: "70%", md: "50%" },
        borderRadius: 3,
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
        {liked ? (
          <Checkbox
            icon={<FavoriteBorder sx={{ color: "#d77286ef" }} />}
            checkedIcon={<Favorite sx={{ color: "#d77286ef" }} />}
            disabled
            checked
            sx={{ margin: "auto" }}
          />
        ) : (
          <Checkbox
            icon={<FavoriteBorder sx={{ color: "#d77286ef" }} />}
            checkedIcon={<Favorite sx={{ color: "#d77286ef" }} />}
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
          <Rating name="read-only" value={productRating()} readOnly />
        ) : null}
      </CardContent>

      <CardActions>
        <Button
          sx={{ margin: "auto" }}
          onClick={() =>
            handleAddToCart({
              name,
              _id,
              price,
              description,
              quantity: 1,
              image,
              discounted_price,
              purchaseQuantity: 1,
            })
          }
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
