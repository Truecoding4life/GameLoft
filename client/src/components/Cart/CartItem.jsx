import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  ListItem,
  
} from "@mui/material";
const CartItem = ({ product, removeFromCart, addToCart }) => {
   const [ quantityCount, setQuantityCount ] = useState(0)
  
   if(product.purchaseQuantity !== quantityCount){
    setQuantityCount(product.purchaseQuantity)
   }

  return (
 
    <ListItem key={product._id} disablePadding>
    <Card sx={{ margin: 1, backgroundColor: "#37374273" }} className="cart-item">
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={product.image}
        onClick={() => (window.location.href = `/products/${product._id}`)}
        className="cart-item-image"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "rows",
          color: "white",
          width: "100%",

        }}
      >
        <CardContent>
          <Typography
            component="div"
            variant="h5"
            fontFamily="Poppins"
            
            width="300px"
            fontSize={{ xs: 12, sm: 16, md: 18, lg: 16, xl: 25 }}
            className="cart-item-name"
          >
            {product.name}
          </Typography>
          <Typography
            component="div"
            variant="h5"
            fontFamily="Nunito Sans"
            margin={1}
            width="100%"
            fontSize={{ xs: 13, sm: 20, md: 19, lg: 20, xl: 26 }}
            className="cart-item-price"
          >
            $ { product.priceDiscount ? product.priceDiscount  : product.price}
          </Typography>
          <Typography
            variant="h5"
            fontFamily="Josefin Sans"
            fontSize={10}
            maxWidth={600}
            marginTop={{xs:0, sm:1, md:1, lg:1, xl:1}}
            marginInline={1}
            className="cart-item-description"
          >
            {product.description}
          </Typography>
        </CardContent>
      
        <CardContent className="cart-item-button"  >
         <Typography variant="p" sx={{paddingLeft:'auto'}}> Quantity : {quantityCount}</Typography>
          <Button sx={{ color: "#f25553" }} onClick={() => {addToCart(product)
            setQuantityCount(quantityCount + 1)
          }}>
            <AddIcon />
          </Button>
          <Button sx={{ color: "#f25553" }} onClick={() => {
            removeFromCart(product) 
            if(quantityCount > 1){
              setQuantityCount(quantityCount - 1)
            }
            }}>
            <RemoveIcon />
          </Button>
        </CardContent>
      </Box>
    </Card>
  </ListItem>
  );
};

export default CartItem;
