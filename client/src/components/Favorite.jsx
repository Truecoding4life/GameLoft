import React from "react";
import AuthService from '../utils/auth'
import { Box, Typography } from "@mui/material";
import {useQuery} from '@apollo/client'
import {QUERY_USER_LIKED_PRODUCTS} from '../utils/queries'
import { ProductCard } from "./Card";
import './style.css'
import './spiner.css'
import { useStoreContext } from "../utils/GlobalState";
import { idbPromise } from "../utils/helpers";

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";


const Favorite = () => {
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const isLoggedIn = AuthService.loggedIn();
  let products = [];
  const { data, loading, error, refetch } = useQuery(QUERY_USER_LIKED_PRODUCTS, {
    variables: { userId: AuthService.getProfile()?.data?.userId },
    skip: !isLoggedIn || !AuthService.getProfile(), 
  });
  if(data){
    products = data.getAllLiked
  }


  const addToCart = (product) => {
    const { _id } = product;
   

    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
   
    if (itemInCart) {
   
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {

      dispatch({
        type: ADD_TO_CART,
        cart: { ...product, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...product, purchaseQuantity: 1 });
    }
  };

  return (
    <Box flex={4} p={2} textalign="center" style={{minHeight:'100vh'}} >

{loading && (
          <Box flex={4}>
            <Typography variant="h4" className="spinner"></Typography>
          </Box>
        )}
      {isLoggedIn ? (
        

        <Box className="main-display">

            {products.length > 1 ? (

products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            refetch={refetch}
            addToCart={addToCart}
          />))

            ) : (
              <p className="no-favorite-text"> You have no favorite</p>
            
            )}
      

     </Box>


      ) : <p className="no-favorite-text"> You have to log in</p> }
    </Box>
  );
};

export default Favorite;
