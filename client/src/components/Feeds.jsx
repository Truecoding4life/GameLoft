import React from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { ProductCard } from "./Card";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { idbPromise } from "../utils/helpers";
import './spiner.css'
import {useSelector, useDispatch} from 'react-redux'
import { updateCartQuantity, addToCart } from "../utils/feature/cartSlice";
import { updateProducts } from "../utils/feature/homeSlice";

const Feeds = () => {
  const cart = useSelector(state => state.cart.cart)
  const products = useSelector(state => state.home.products)
  const dispatch = useDispatch()
  const { loading, data, error, refetch } = useQuery(QUERY_ALL_PRODUCTS);

  

  useEffect(() => {
    if (data) {
      dispatch(updateProducts(data.products))
   
      updateProducts(data.products)
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      console.log("Error in loading products");
    }
  }, [data, loading, dispatch]);

 

 

  const handleAddToCart = (product) => {
    const { _id } = product;
   

    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
   
    if (itemInCart) {
   
     dispatch(updateCartQuantity({
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
     }))
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {

      dispatch(addToCart(product));
      idbPromise("cart", "put", { ...product, purchaseQuantity: 1 });
    }
  };

  return (
    <>
      <Box flex={3} p={3} minHeight='100vh'>
        { data ? (
          <Box className="main-display">
            {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              refetch={refetch}
              handleAddToCart={handleAddToCart}
            />
          ))}
          </Box>
        ) : (
          <div className="spinner">

          </div>
        )}
      </Box>
    </>
  );
};

export default Feeds;
