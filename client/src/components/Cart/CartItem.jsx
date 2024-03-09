import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import {
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Modal,
} from "@mui/material";
const CartItem = ({ product }) => {

  return (
    <ListItem key={product._id} disablePadding>
    <Card sx={{ margin: 1, backgroundColor: "#59626a73" }} className="cart-item">
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
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <CardContent>
          <Typography
            component="div"
            variant="h5"
            fontFamily="Poppins"
            
            width="100%"
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
            $ {product.price}
          </Typography>
          <Typography
            variant="h5"
            fontFamily="Josefin Sans"
            fontSize={10}
            maxWidth={600}
            marginTop={2}
            marginInline={1}
            className="cart-item-description"
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardContent className="cart-item-button">
          <Button sx={{ color: "#f25553" }} onClick={() => removeFromCart(product)}>
            Remove
          </Button>
        </CardContent>
      </Box>
    </Card>
  </ListItem>
  );
};

export default CartItem;
