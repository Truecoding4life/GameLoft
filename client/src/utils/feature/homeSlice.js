import {
    createEntityAdapter,
      createSlice
    } from '@reduxjs/toolkit'
    
    const homeAdapter = createEntityAdapter()
const initialState = homeAdapter.getInitialState({
    currentPage: 'Home',
    products: [],
})

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        updateProducts: (state, action) => {
            state.products = action.payload
        },
    }
})

export const { updateCurrentPage, updateProducts } = homeSlice.actions

export default homeSlice.reducer