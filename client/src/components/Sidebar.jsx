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

export const Sidebar = ({ currentPage, handlePageChange }) => {
  return (
    <Box flex={1} p={2} id='side-bar' sx={{ display: { xs: "none", sm: "none", md: "block" } }} className='side-bar'>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
      <LiveSearch></LiveSearch>

            </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => handlePageChange("Home")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => handlePageChange("Favorite")} >
              <ListItemIcon>
                <StarRateIcon sx={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Favorite" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => handlePageChange("Coupons")} >
              <ListItemIcon>
                <LocalOfferIcon sx={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Coupons" />
            </ListItemButton>
          </ListItem>

          <Link to="./history">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Order history" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton component="a"onClick={() => handlePageChange("contact")} >
              <ListItemIcon>
                <ContactMailIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Contact us" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Brightness2Icon sx={{ color: 'white' }}/>
              </ListItemIcon>
              <Switch />{" "}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
