import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  CardMedia,
  Checkbox,
  Box,
  Stack,
  Container,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { FavoriteBorder, Favorite, ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { CardHeader } from "@mui/material";

const handleViewDetail = (id) => {
  window.location.href = `/products/${id}`;
};

export function ProductCard({
  name,
  _id,
  price,
  description,
  image,
  addToCart,
}) {

 
  return (
    <Card
      key={_id}
      className="flex-item shop-item"
      sx={{
        width: { xs: '40%',sm: "27%", md: "27%", lg: "20%", xl: "14%" },
        maxWidth: { sm: "70%", md: "50%" },
        borderRadius: 5,
        backgroundColor:'black',
        color:'white',
        boxShadow: 4,
        margin: 0,
        padding: 0,
      }}
    >
      <CardMedia
        onClick={() => handleViewDetail(_id)}
        component="img"
        image={image}
        alt="Paella dish"
        sx={{maxHeight:200}}
      />
          
      <CardContent>
        <Typography variant="h5" sx={{fontSize:14, fontFamily:'Poppins'}}> {name}</Typography>
        <Typography variant="h6" sx={{fontSize:17, fontFamily:'Poppins'}} > ${price}</Typography>
      </CardContent>

        <CardActions>

        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ color: 'white' }}  />
        <Divider orientation="vertical" flexItem />
        <Button
          onClick={() =>
            addToCart({ name, _id, price, description, quantity: 1, image })
          }
        >
          Add to cart
        </Button>
        </CardActions>

    </Card>
  );
}
