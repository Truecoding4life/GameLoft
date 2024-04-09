import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_CHECKOUT, QUERY_USER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../../utils/actions";
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

const stripePromise = loadStripe(
  "pk_test_51ONTIVHTFh8Wci3c6KmX3ltxyZAHhSTHFY12NMZwUeg6eHfDykwMEYyJvzIr979461JfVxXjBN0Ogl9dcSzcRjaa00X89U6v2w"
);

const Cart = () => {
  const loggedIn = Auth.loggedIn();
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [open, setOpen] = useState(false);
  try {
    const { loading, thisData } = useQuery(QUERY_USER, {
      variables: { email: authenticateEmail },
    });
    console.log(thisData);
  } catch (e) {
    console.log(e);
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

  const calculateTotal = () => {
    return state.cart.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0).toFixed(2);
  };

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const handleCheckout = () => {
    if (!state.cart.length) {
      return setOpen(true);
    }
    getCheckout({
      variables: {
        products: [...state.cart],
      },
    });
  };

  const handleClearCart = () => {
    state.cart.forEach(removeFromCart);
  };

  let userFullName = "???";
  let userEmail = "???";

if(loggedIn){
  userFullName = Auth.getProfile().data.firstName;
  userEmail = Auth.getProfile().data.email;
  }

  return (
    <Box id="cart-container" >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="white" fontFamily="Silkscreen" fontSize={23}>
          Order summary
        </Typography>


      </Box>



      <List disablePadding>
        {state.cart.length ? (
          state.cart.map((product) => (
            <CartItem key={product._id} product={product} removeFromCart={removeFromCart} />
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
            Total $: {calculateTotal()}
          </Typography>

          <TextField className="coupon-input" placeholder="Coupon" InputProps={{
            startAdornment: (
              <AutoFixHighIcon sx={{ color: "black" }} />
            ),
            endAdornment: (
              <Button variant="contained" color="success" >Apply</Button>
            ),
            
          }} sx={{
            fontFamily: 'Poppins',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'transparent', // Remove the border color when focused
              },},
              
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
          <Button onClick={handleClearCart} variant="contained" sx={{ margin: 1 }} color="error">
            Clear Cart
          </Button>

          {loggedIn && state.cart.length ? (
          <Button onClick={handleCheckout} variant="contained" sx={{ margin: 1 }} color="success">
            Pay Now
          </Button>
          
        ) : (


        <Button onClick={() => {window.location.href = '/login'}} variant="contained" sx={{ margin: 1 }} color="success">
            Login
          </Button>
        )}
        
        </Grid>
      </Grid>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "maroon", border: "2px solid #000", boxShadow: 24, p: 4, borderRadius: "10px" }}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
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
