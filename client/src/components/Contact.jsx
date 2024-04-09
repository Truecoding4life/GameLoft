import React from "react";
import { Box } from "@mui/material";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from 'react';




const Contact = () => {
    const [formState, setFormState] = useState({ message: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/";
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                
                height: "100vh",
            }}
        >
            <Box
            className="form"
                sx={{
                    
                    
                    display: "flex",
                    flexDirection: "column",
                    
                    
                    
                }}
            >
                <Typography  component="h1" variant="h3" id="contact-message">
                    Send Us A Message
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="message"
            label="Write your message here"
            multiline
            maxRows={6}
            variant="outlined"
            focused
            sx={{ mt: 3, mb: 2, color: "white" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={()=>window.location.href = "/"}
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>

            </Box>
        </Box>
    );
};

export default Contact;
