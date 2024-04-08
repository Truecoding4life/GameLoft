import React from "react";
import AuthService from '../utils/auth'
import { Box } from "@mui/material";
import './style.css'

const Favorite = () => {
  return (
    <Box flex={4} p={2} textAlign={"center"} style={{minHeight:'100vh'}} >
      {AuthService.loggedIn() ? (
        <p > You have to log in</p>

      ) : <p className="no-favorite-text"> You have to log in</p> }
    </Box>
  );
};

export default Favorite;
