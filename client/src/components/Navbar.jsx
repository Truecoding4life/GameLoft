import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Divider,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Modal,
  Badge,
  Autocomplete,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Cart from "./Cart/Cart";
import Alert from '@mui/material/Alert';
import { CheckCircleOutline } from "@mui/icons-material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import 'animate.css';



import {useSelector, useDispatch} from 'react-redux'

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});



const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
}));

function showLogin() {
  if (Auth.loggedIn()) {
    return (
      <div >
        <MenuItem>
          <Link to="./profile">My account</Link>
        </MenuItem>
        <Divider />

        <MenuItem>
          <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
        </MenuItem>
      </div>
    );
  } else {
    return (
      <div>
        <MenuItem>
          <Link to="/signup">Sign Up</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/login">Login</Link>
        </MenuItem>
      </div>
    );
  }
}

export const Navbar = () => {
  
  const cart = useSelector(state => state.cart.cart)
  const [openAccount, setOpenAccount] = useState(false);
  const [openModal, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  let SuccessAlert = useSelector(state => state.alert.successAlert);
  let errorAlert = useSelector(state => state.alert.errorAlert);



  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      let product = cart[i];
      let quantity = product.purchaseQuantity;
      count += quantity;
    }
    setCartCount(count);


  }, [cart]);




  const handleOpen = () => {
    // Update cart count before opening the cart modal
    setOpen(true);
  };
  return (
    <AppBar position="sticky" id='navbar'>
      <StyledToolbar>
        <Typography
          variant="h5"
          component="a"
          href="/"
          style={{
            fontFamily: "Silkscreen",
            fontSize: "30px",
          }}
          id="branding"
          sx={{ display: { xs: "none", sm: "block" } }}
        >

          GameLoft
        </Typography>

        <VideogameAssetIcon onClick={() => { window.location = '/' }} sx={{ display: { sm: "none", xs: "block" } }} />



        <Icons>
          {Auth.loggedIn() ? (
            <Badge color="success" id="account" variant="dot">
              <AccountBoxIcon
                
                sx={{ color: 'white' }}
                onClick={() => {
                  setOpenAccount(true);
                }}
              />
            </Badge>
          ) : (
            <AccountBoxIcon
              id="account"
              sx={{ color: 'white' }}
              onClick={() => {
                setOpenAccount(true);
              }}

            />
          )}

          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon sx={{ color: 'white' }} color="action" onClick={handleOpen} />
          </Badge>
          <Modal
            arial-labelledby="Check Out Cart Modal"
            open={openModal}
            keepMounted
            onClose={() => handleClose()}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Cart></Cart>
          </Modal>

          <Menu
            id="profile-menu"
            aria-labelledby="Login Menu"
            open={openAccount}
            
            onClose={() => setOpenAccount(false)}
            anchorEl={document.getElementById("account")}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            
          >

            {showLogin()}
          </Menu>
        </Icons>
      </StyledToolbar>


      {SuccessAlert && (

        <Alert className="animate__animated animate__fadeIn" icon={<CheckCircleOutline fontSize="inherit" />} severity="info">
          Successful, {SuccessAlert}
        </Alert>
      )}
      {errorAlert && (

        <Alert className="animate__animated animate__fadeIn" icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
          Error, {errorAlert}
        </Alert>
      )}
    </AppBar>
  );
};
