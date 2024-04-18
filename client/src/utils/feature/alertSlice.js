import {
  createEntityAdapter,
    createSlice
  } from '@reduxjs/toolkit'
  
  const alertAdapter = createEntityAdapter()
const initialState = alertAdapter.getInitialState({
  successAlert: '',
  errorAlert: '',
})


const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setSuccessAlert: (state, action) => {
      state.successAlert = action.payload
    },
    setErrorAlert: (state, action) => {
      state.errorAlert = action.payload
    },
    clearAlert: (state) => {
      state.successAlert = ''
      state.errorAlert = ''
    }
  }
})

export const { setSuccessAlert, setErrorAlert, clearAlert } = alertSlice.actions

export default alertSlice.reducer