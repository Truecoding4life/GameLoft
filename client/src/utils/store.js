import { configureStore } from '@reduxjs/toolkit';
import {reducer} from './reducers.js';
import homeReducer from './feature/homeSlice.js';
import cartReducer from './feature/cartSlice.js';
import alertReducer from './feature/alertSlice.js';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        cart: cartReducer,
        alert: alertReducer
    }
})