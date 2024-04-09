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
import { useStoreContext } from "../utils/GlobalState";


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
      <MenuItem>
        <a href="/" onClick={() => Auth.logout()}>
          Logout
        </a>
      </MenuItem>
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
  const [openAccount, setOpenAccount] = useState(false);
  const [openModal, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [state, dispatch] = useStoreContext();

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => { 
    setCartCount(state.cart.length)
    }, [state.cart] );

    const handleOpen = () => {
      // Update cart count before opening the cart modal
      setCartCount(state.cart.length);
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

        <VideogameAssetIcon onClick={()=>{window.location='/'}} sx={{ display: { sm: "none", xs: "block" } }} />
      


        <Icons>
          {Auth.loggedIn() ? (
            <Badge color="success"  variant="dot">
              <AccountBoxIcon
              sx={{ color: 'white' }}
                onClick={() => {
                  setOpenAccount(true);
                }}
                color="action"
              />
            </Badge>
          ) : (
            <AccountBoxIcon
            sx={{ color: 'white' }}
              onClick={() => {
                setOpenAccount(true);
              }}
              color="action"
            />
          )}

          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon sx={{ color: 'white' }} color="action" onClick={handleOpen} />
          </Badge>
          <Modal
            open={openModal}
            onClose={handleClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Cart />
          </Modal>

          <Menu
            id="profile-menu"
            aria-labelledby="demo-positioned-button"
            open={openAccount}
            onClose={() => setOpenAccount(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <Link to="./profile">My account</Link>
            </MenuItem>
            <Divider />
            {showLogin()}
          </Menu>
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};
