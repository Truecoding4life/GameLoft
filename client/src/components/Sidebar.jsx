import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import StarRateIcon from "@mui/icons-material/StarRate";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-router-dom";
import LiveSearch from "./LiveSearch";
import './style.css'
import { useStoreContext } from "../utils/GlobalState";
import { TOGGLE_CART } from "../utils/actions";






export const Sidebar = () => {
  let notHome = window.location.pathname.split("/")[1];

  function toggleSidebar(page){
    dispatch({
      type: 'UPDATE_CURRENT_PAGE',
      payload: page,
    });
  }

  const [state, dispatch] = useStoreContext();
  const handlePageChange = async (page) => {
    if (notHome) {
      window.location.href = '/';
      
    }
    toggleSidebar(page)
  };
  return (
    <Box flex={1} p={2} id='side-bar' sx={{ display: { xs: "none", sm: "none", md: "block" }}} className='side-bar'>
      <Box position="fixed">
        <List>
          <ListItem >
      <LiveSearch></LiveSearch>

            </ListItem>
          <ListItem >
            <ListItemButton component="a" onClick={() => handlePageChange("Home")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

      { !notHome ? (
        <>
          <ListItem >
            <ListItemButton component="a" onClick={() => handlePageChange("Favorite")} >
              <ListItemIcon>
                <StarRateIcon sx={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Favorite" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton component="a" onClick={() => handlePageChange("Coupons")} >
              <ListItemIcon>
                <LocalOfferIcon sx={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Coupons" />
            </ListItemButton>
          </ListItem>

        
          <ListItem >
            <ListItemButton component="a"onClick={() => handlePageChange("contact")} >
              <ListItemIcon>
                <ContactMailIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Contact us" />
            </ListItemButton>
          </ListItem>

          


        </>  ) : null }
        </List>
      </Box>
    </Box>
  );
};
