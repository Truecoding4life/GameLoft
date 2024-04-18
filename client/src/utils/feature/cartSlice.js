import {
    createEntityAdapter,
      createSlice
    } from '@reduxjs/toolkit'
    
    const cartAdapter = createEntityAdapter()

const initialState = cartAdapter.getInitialState({
    cartOpen: false,
    cart: [],
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartOpen = true
            state.cart.push(action.payload)
        },
        addMultipleToCart: (state, action) => {
            state.cartOpen = true
            state.cart.push(...action.payload)
        },
        updateCartQuantity: (state, action) => {
            state.cartOpen = true
            state.cart.map(product => {
                if (action.payload._id === product._id) {
                    product.purchaseQuantity = action.payload.purchaseQuantity
                }
                return product
            })
        },
        removeFromCart: (state, action) => {
            state.cartOpen = state.cart.length > 0
            state.cart = state.cart.filter(product => product._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartOpen = false
            state.cart = []
        }
    }
})

export const { addToCart, addMultipleToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer