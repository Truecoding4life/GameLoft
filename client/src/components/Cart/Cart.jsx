import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_CHECKOUT, QUERY_USER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART } from "../../utils/actions";
import Auth from "../../utils/auth";
import "../../styles/Cart/style.css";
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

const Cart = () => {
  let authenticateEmail;
  const loggedIn = Auth.loggedIn();
  if (loggedIn) {
    authenticateEmail = Auth.getProfile().data.email;
  }
  const [userData, setUserData] = useState(null);

  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let userFullName = "???";
  let userFullAddress = "???";

  useEffect(() => {
    const fetchData = async () => {
      const { loading, data } = await useQuery(QUERY_USER, {
        variables: { email: authenticateEmail },
      });

      if (!loading && data && data.user) {
        setUserData(data);
      }
    };

    fetchData();
  }, [authenticateEmail]);

  if (loggedIn && userData && userData.user) {
    userFullName = `${userData.user.firstName} ${userData.user.lastName}`;
    userFullAddress = `${userData.user.address} ${userData.user.city}, ${userData.user.state} ${userData.user.zip}`;
  } else {
    console.log("Not logged in");
  }
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

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

  function handleClearCart() {
    console.log(data);
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
                margin: 2,
                backgroundColor:'#b4b8bb'
              }}
              className="cart-item"
            >
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={product.image}
                onClick={() =>
                  (window.location.href = `/products/${product._id}`)
                }
                className="cart-item-image"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    component="div"
                    variant="h5"
                    fontFamily={"Poppins"}
                    fontSize={{ xs: 13, sm: 16, md: 18, lg: 16, xl: 25 }}
                    className="cart-item-name"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontFamily={"Poppins"}
                    fontSize={10}
                    maxWidth={500}
                    className="cart-item-description"
                  >
                    {product.description}
                  </Typography>
                  <Button sx={{ alignSelf:'center', justifyContent:'center', margin:'auto' }} onClick={() => removeFromCart(product)}>
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
            Name : {userFullName}
          </Typography>
          <Typography
            sx={{ fontWeight: "lighter" }}
            fontFamily={"Poppins"}
            bottom
            color="white"
          >
            Address {userFullAddress}
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
