import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_CHECKOUT, QUERY_USER } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "./CartItem";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART } from "../utils/actions";
import Auth from "../utils/auth";
import "../styles/Cart/style.css";
import {
  Button,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Alert,
  Box,
  Grid,
  CardActionArea,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "maroon",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const stripePromise = loadStripe(
  "pk_test_51ONTIVHTFh8Wci3c6KmX3ltxyZAHhSTHFY12NMZwUeg6eHfDykwMEYyJvzIr979461JfVxXjBN0Ogl9dcSzcRjaa00X89U6v2w"
);
let authenticateEmail;
const loggedIn = Auth.loggedIn();
if(loggedIn){

  authenticateEmail = Auth.getProfile().data.email;
}
const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout] = useLazyQuery(QUERY_CHECKOUT);
  

  let userFullName = "???";
  let userFullAddress = "???";

  if (loggedIn) {
    const { loading, data } = useQuery(QUERY_USER, {
      variables: { email: authenticateEmail },
    });

    if (!loading && data && data.user) {
      userFullName = `${data.user.firstName} ${data.user.lastName}`;
      userFullAddress = `${data.user.address} ${data.user.city}, ${data.user.state} ${data.user.zip}`;
    }
  } else {
    console.log("Not logged in");
  }
  
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    getCart();
  }, [loggedIn, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleClearCart() {console.log(data);}
  function handleCheckout() {
    if (!state.cart.length) {
      return handleOpen();
    }
    getCheckout({
      variables: {
        products: [...state.cart],
      },
    });
  }

  
  return (
    <Box
      sx={{
        height: "80%",
        overflow: "auto",
        padding: "2rem",
        borderRadius: 5,
      }}
      id="cart-container"
    >
      <Typography
        variant="h6"
        color="white"
        sx={{ fontWeight: "lighter" }}
        fontFamily={"Poppins"}
        bottom
      >
        Order summary
      </Typography>
      <Divider />
      <List disablePadding>
        {state.cart.map((product) => (
          <ListItem key={product._id} disablePadding>
            <Card
              sx={{
                display: "flex",
                margin: 1,
                borderRadius: 5,
                backgroundColor: "#b4b8bb",
                width: "100%",
                maxHeight: 500,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={product.image}
                onClick={() =>
                  (window.location.href = `/products/${product._id}`)
                }
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ width: "100%" }}>
                  <Typography
                    component="div"
                    variant="h5"
                    fontFamily={"Poppins"}
                    fontSize={17}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontFamily={"Poppins"}
                    fontSize={10}
                    maxWidth={600}
                  >
                    {product.description}
                  </Typography>
                  <Button onClick={() => removeFromCart(product)}>
                    Remove
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </ListItem>
        ))}

        <Divider />
      </List>
      <Grid container spacing={2} style={{ width: "100%", margin: "auto" }}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
            fontFamily={"Poppins"}
            color="white"
          >
            Total $ : {calculateTotal()}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "lighter", mt: 2, color: "white" }}
            fontFamily={"Poppins"}
            bottom
          >
            Payment details
          </Typography>
          <Typography
            variant="h6"
            color="white"
            sx={{ fontWeight: "lighter" }}
            fontFamily={"Poppins"}
          >
            Shipping
          </Typography>
          <Typography
            bottom
            sx={{ fontWeight: "lighter" }}
            fontFamily={"Poppins"}
            color="white"
          >
            Name : {loggedIn ? userFullName : "???"}
          </Typography>
          <Typography
            sx={{ fontWeight: "lighter" }}
            fontFamily={"Poppins"}
            bottom
            color="white"
          >
            Address {loggedIn ? userFullAddress : "???"}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={6}
          sx={{ my: "auto" }}
        >
          <Button onClick={handleClearCart} variant="contained" color="warning">
            Clear Cart
          </Button>
          <Button onClick={handleCheckout} variant="contained" color="success">
            Pay Now
          </Button>
        </Grid>
      </Grid>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              No Item Has Been Selected
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              There is no item in your cart
            </Typography>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Cart;
