import { useState, useEffect } from "react";
import { ProductCard } from "../../components/Card";
import { Navbar } from "../../components/Navbar";
import RightBar from "../../components/Rightbar";
import { Sidebar } from "../../components/Sidebar";
import { Box, Stack } from "@mui/material";
import Feeds from "../../components/Feeds";
import Coupons from "../../components/Coupons";
import Favorite from "../../components/Favorite";
import Contact from "../../components/Contact";
import Cart from "../../components/Cart/Cart";
import { useStoreContext } from "../../utils/GlobalState";
import {  DO_SUCCESS_ALERT, CLOSE_ALERT } from "../../utils/actions";
import Auth from '../../utils/auth'
import './style.css'

import {useSelector, useDispatch} from 'react-redux'
import { updateCurrentPage } from "../../utils/feature/homeSlice";

const Home = () => {
  const loggedIn = Auth.loggedIn();
  const dispatch = useDispatch()
  
  let currentPage = useSelector(state => state.home.currentPage)




  const handlePageChange = (page) => {
    dispatch(updateCurrentPage(page));

  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Feeds />;
      case 'Favorite':
        return <Favorite />;
      case 'Coupons':
        return <Coupons />;
      case 'contact':
        return <Contact />;
      case 'Cart':
        return <Cart />;
    }
  };

 
  return (
    <Box className='home-page'>
      <Navbar  />
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <Sidebar currentPage={currentPage} handlePageChange={handlePageChange} />
        <Box flex={4} p={2} className="main-display" >{renderPage()}</Box>


      </Stack>
    </Box>
  );
};

export default Home;

