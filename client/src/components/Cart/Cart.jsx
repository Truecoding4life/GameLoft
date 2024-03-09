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
    state.cart.forEach((item) => {
      removeFromCart(item);
    });
  }
  return (
    <Box
      sx={{
        
       height: "100%",
        overflow:'scroll',
        padding: "2rem",
        borderRadius: 5,
        marginTop: 4,
        
       

      }}
      id="cart-container"
    >
      <Typography
        variant="h6"
        color="white"
        sx={{ fontWeight: "lighter" }}
        fontFamily={"Josefin Sans"}
        bottom
      >
        Order summary
      </Typography>
      <List disablePadding>
        {state.cart.length ? state.cart.map((product) => (
          <ListItem key={product._id} disablePadding>
            <Card
              sx={{
                margin: 1,
                backgroundColor:'#59626a73'
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
              <Box sx={{ display: "flex", flexDirection: "rows", color:'white', justifyContent:'space-between', width:'100%'}}>
                <CardContent>
                  <Typography
                    component="div"
                    variant="h5"
                    fontFamily={"Poppins"}
                    margin={1}
                    width={'100%'}
                    fontSize={{ xs: 13, sm: 16, md: 18, lg: 16, xl: 25 }}
                    className="cart-item-name"
                  >
                    {product.name}
                    
                  </Typography>
                  <Typography
                    component="div"
                    variant="h5"
                    fontFamily={"Poppins"}
                    margin={1}
                    width={'100%'}
                    fontSize={{ xs: 20, sm: 20, md: 19, lg: 20, xl: 26 }}
                    className="cart-item-name"
                  >
                    {product.price}
                    
                  </Typography>
                  <Typography
                    variant="h5"
                    fontFamily={"Josefin Sans"}
                    fontSize={10}
                    maxWidth={600}
                    marginTop={2}
                    marginInline={1}
                    className="cart-item-description"
                  >
                    {product.description}
                  </Typography>
                 
                </CardContent>
                <CardContent className='cart-item-button'>
                   <Button sx={{ color:'#f25553'}} onClick={() => removeFromCart(product)}>
                    Remove
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </ListItem>
        )) : <Box>
          <Typography
                    component="div"
                    variant="h1"
                    fontFamily={"Roboto"}
                    sx={{padding:5, textAlign:'center'}}
                    fontSize={30}
                    color={'white'}
                  >
                    No item in cart
                    
                  </Typography>
          </Box>}


      </List>
      <Grid container spacing={2} style={{ width: "100%", margin: "auto" }}>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", fontSize: 23}}
            fontFamily={"Josefin Sans"}
            color="white"
          >
            Total $ : {calculateTotal()}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "lighter", mt: 2, color: "white" }}
            fontFamily={"Josefin Sans"}
            bottom
          >
            Payment details
          </Typography>
          <Typography
            variant="h6"
            color="white"
            sx={{ fontWeight: "lighter" }}
            fontFamily={"Josefin Sans"}
          >
            Shipping
          </Typography>
          <Typography
            bottom
            sx={{ fontWeight: "lighter" }}
            fontFamily={"Josefin Sans"}
            color="white"
          >
            Name : {userFullName}
          </Typography>
          <Typography
            sx={{ fontWeight: "lighter" }}
            fontFamily={"Josefin Sans"}
            bottom
            color="white"
          >
            Address {userFullAddress}
          </Typography>
        </Grid>
        <Grid
          item
          
          
          xs={12}
          sm={12}
          sx={{ my: "auto" }}
        >
          <Button onClick={handleClearCart} variant="contained" color="warning">
            Clear Cart
          </Button>
          
        </Grid>

        <Grid
          item
          
          
          xs={12}
          sm={12}
          sx={{ my: "auto" }}
        >
         
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
