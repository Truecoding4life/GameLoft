import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/SignUp/styles.css';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Boring Game Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
  return randomNumber.toString();
}


const defaultTheme = createTheme();

function Signup() {
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      _id: generateRandomNumber(),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      address: data.get('address'),
      city: data.get('city'),
      zip: data.get('zip'),
      state: data.get('state'),
    })
    const mutationResponse = await addUser({
      variables: {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        address: data.get('address'),
        city: data.get('city'),
        zip: data.get('zip'),
        state: data.get('state'),
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  
    
      return (
        
          <Container component="main" id='signUp' maxWidth="xs">
            <Box
             
              sx={{
            
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                

                
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'black' }} >
                <LockOutlinedIcon />
        
              </Avatar>
              <Typography component="h1" variant="h5" color={'black'} >
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }} width={400} >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      
                     
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      
                    />
                  </Grid>
            
                  <Grid item xs={12}>
                    <TextField
                      required
                      
                      fullWidth
                      name="address"
                      label="Address"
                      id="address"
                      autoComplete="new-address"

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      
                      fullWidth
                      name="city"
                      label="City"
                      id="city"
                      autoComplete="new-city"
                     
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      
                      fullWidth
                      name="state"
                      label="State"
                      id="state"
                      autoComplete="new-state"
                   
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      
                      fullWidth
                      name="zip"
                      label="Zipcode"
                      id="zip"
                      autoComplete="new-zip"
                      
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
  
              
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex" >
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }}  marginRight={20}/> */}
          </Container>
      );
    }

export default Signup;