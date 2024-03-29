import { useState } from "react";
import{ ProductCard } from "../components/Card";
import "../App.css";
import { Navbar } from "../components/Navbar";
import RightBar from "../components/Rightbar";
import { Sidebar } from "../components/Sidebar";
import { Box, Stack } from "@mui/material";
import Feeds from "../components/Feeds";
import Coupons from "../components/Coupons"; 
import Favorite from "../components/Favorite";
import Contact from "../components/Contact";
import { useStoreContext } from "../utils/GlobalState";
import Cart from "../components/Cart/Cart";
import { TOGGLE_CART } from "../utils/actions";




const Home = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [state, dispatch] = useStoreContext();

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  }
  const handlePageChange = (page) => setCurrentPage(page);

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
      <Navbar toggleCart={toggleCart} cart={state.cart} />
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <Sidebar currentPage={currentPage} handlePageChange={handlePageChange} />
        <Box  flex={4} p={2} className="main-display" >{renderPage()}</Box> 
       
       
      </Stack>
    </Box>
  );
};

export default Home;

