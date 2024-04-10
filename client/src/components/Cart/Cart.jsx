import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_CHECKOUT, QUERY_USER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import Auth from "../../utils/auth";
import {
  Button,
  Box,
  Grid,
  Typography,
  List,
  Modal,
  TextField
} from "@mui/material";
import CartItem from "./CartItem";
import './style.css'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { SafetyDividerOutlined } from "@mui/icons-material";
import { forwardRef } from 'react';

const stripePromise = loadStripe(
  "pk_test_51ONTIVHTFh8Wci3c6KmX3ltxyZAHhSTHFY12NMZwUeg6eHfDykwMEYyJvzIr979461JfVxXjBN0Ogl9dcSzcRjaa00X89U6v2w"
);

const Cart =  forwardRef( function carted() {


  const loggedIn = Auth.loggedIn();
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data, error }] = useLazyQuery(QUERY_CHECKOUT);
  const [couponInput, setCouponInput] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  let cartItems = JSON.parse(JSON.stringify(state.cart));
  let discountPriceDisplay;
  let totalPriceDisplay = calculateTotal();
  let userFullName = "???";
  let userEmail = "???";
  let savedPriceDisplay;



  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
    if (error) {
      console.log(error)
    }
  }, [data, error]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      if (!state.cart.length) {
        getCart();
      }
    }


  }, [state.cart.length, dispatch]);


// Function to calculate total price of all items in the cart
  function calculateTotal() {
    return cartItems.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0).toFixed(2)
  };


// Function to execute when user click on remove button
  const removeFromCart = (item) => {
    item.discounted_price = null;
    if (item.purchaseQuantity > 1) {
      item.purchaseQuantity = item.purchaseQuantity - 1;
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: item.purchaseQuantity,
      });
    }
    else {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    }
  };



  // Function to execute when user click on add more quantity button
  const addToCart = (item) => {
    item.purchaseQuantity = item.purchaseQuantity + 1;
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: item.purchaseQuantity,
    })
    totalPriceDisplay = calculateTotal();
  }


  // Function to execute when user click on pay now button
  const handleCheckout = () => {
    getCheckout({
      variables: {
        products: [...cartItems]
      },
    });


  };

  const handleClearCart = () => {
    state.cart.forEach(removeFromCart);
  };



  if (loggedIn) {
    userFullName = Auth.getProfile().data.firstName;
    userEmail = Auth.getProfile().data.email;
  }


// This function will run through the cart and modify it price if there is a discount
  if (discountPercent) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].discounted_price !== true) {
        let discountCal = parseInt(((cartItems[i].price - cartItems[i].price * (discountPercent / 100))))
        cartItems[i].discounted_price = discountCal
        cartItems[i].price = discountCal
      }
    }
    discountPriceDisplay = calculateTotal();
    savedPriceDisplay = (totalPriceDisplay - discountPriceDisplay).toFixed(2)
  }






  function verifyCoupon(coupon) {
    switch (coupon) {
      case ("FIRST20"):
        setDiscountPercent(20)
        break;
      case ("LOYAL4EVA"):
        setDiscountPercent(10)
        break;
      case ("15OFF"):
        setDiscountPercent(15)
        break;
      default:
        setDiscountPercent(0)

    }
  }




  return (

    <Box id="cart-container" sx={{ maxHeight: 'calc(100vh - 40px)', overflowY: 'scroll' }}>
      <Box sx={{ padding: 2 }} display='flex' justifyContent='space-between' >
        <Typography variant="h6" color="white" fontFamily="Silkscreen" fontSize={23}>
          Order summary
        </Typography>

        <Button onClick={handleClearCart} variant="contained" sx={{ margin: 1, borderRadius: 10, boxShadow: 1 }} color="error" textalign='end'>
          Clear Cart
        </Button>
      </Box>



      <List disablePadding>
        {state.cart.length ? (
          cartItems.map((product) => (
            <CartItem key={product._id} product={product} addToCart={addToCart} removeFromCart={removeFromCart} />
          ))
        ) : (
          <Box>
            <Typography
              component="div"
              variant="h1"
              fontFamily="Nunito Sans"
              sx={{ padding: 5, textAlign: "center" }}
              fontSize={40}
              color={"white"}
            >
              Cart is empty
            </Typography>
          </Box>
        )}

      </List>

      <Grid container spacing={2} style={{ width: "100%", margin: "auto" }}>

        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: 24 }} fontFamily="Nunito Sans" color="white">
            Total $: {totalPriceDisplay}
          </Typography>
          {discountPriceDisplay ? (<>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: 24 }}  fontFamily="Nunito Sans" color="error">
              You Saved $: {savedPriceDisplay}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: 24, color: '#5fef8f' }} fontFamily="Nunito Sans" color="white">
              New Price $: {discountPriceDisplay}
            </Typography></>) : null}
          <TextField className="coupon-input" onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon" InputProps={{
            startAdornment: (
              <AutoFixHighIcon sx={{ color: "black" }} />
            ),
            endAdornment: (
              <Button variant="contained" onClick={() => { verifyCoupon(couponInput) }} color="success" >Apply</Button>
            ),

          }} sx={{
            fontFamily: 'Poppins',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'transparent', // Remove the border color when focused
              },
            },

          }}>

          </TextField>

          <Typography
            variant="h6"
            sx={{ fontWeight: "lighter", mt: 1, color: "white" }}
            fontFamily="Nunito Sans"
            bottom
          >
            Shipping details
          </Typography>

          <Typography
            bottom
            sx={{ fontWeight: "lighter" }}
            fontFamily="Nunito Sans"
            color="white"
          >
            Name: {userFullName}
          </Typography>
          <Typography
            sx={{ fontWeight: "lighter" }}
            fontFamily="Nunito Sans"
            bottom
            color="white"
          >
            Email: {userEmail}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          flexDirection="column"
          justifyContent="center"

        >


          {loggedIn && state.cart.length ? (
            <Button onClick={handleCheckout} variant="contained" sx={{ margin: 1 }} color="success">
              Pay Now
            </Button>

          ) : (


            <Button onClick={() => { window.location.href = '/login' }} variant="contained" sx={{ margin: 1 }} color="success">
              Login
            </Button>
          )}

        </Grid>
      </Grid>
    </Box>
  );
});

export default Cart;
