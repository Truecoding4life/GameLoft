/* eslint-disable no-case-declarations */
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  UPDATE_CURRENT_PAGE,
  DO_SUCCESS_ALERT,
  CLOSE_ALERT,
  DO_ERROR_ALERT
    
} from "./actions";

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
  currentPage: 'Home',
  successAlert: '',
  errorAlert: '',
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.cart],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity ;
          }
          return product
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

   

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };
    case DO_SUCCESS_ALERT:
      return {
        ...state,
        successAlert: action.successAlert,
      };
    case CLOSE_ALERT:
      return {
        ...state,
        successAlert: '',
        errorAlert: ''
      };
    case DO_ERROR_ALERT:
      return {
        ...state,
        errorAlert: action.errorAlert,
        
      };
    default:
      return state;
  }
};
