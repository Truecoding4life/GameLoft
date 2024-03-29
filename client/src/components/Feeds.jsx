import React from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { ProductCard } from "./Card";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";

const Feeds = () => {
  const [state, dispatch] = useStoreContext();

  // const { currentCategory } = state;

  const { loading, data, error } = useQuery(QUERY_ALL_PRODUCTS);

  // const products = data?.products || [];
  

  useEffect(() => {
    if (data) {
      
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

 

  const { cart } = state;

 

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
    <>
      <Box flex={3} p={3}>
        {state.products.length ? (
          <Box className="main-display">
            {state.products.map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name}
                price={product.price}
                ratingArray={product.rating}
                description={product.description}
                image={product.image}
                category={product.category}
                addToCart={addToCart}
              
              />
            ))}
          </Box>
        ) : (
          <h3>You haven't added any products yet!</h3>
        )}
      </Box>
    </>
  );
};

export default Feeds;
