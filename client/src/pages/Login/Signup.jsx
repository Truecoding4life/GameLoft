import * as React from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth.js';
import {Avatar, Button, Container, Grid, Link, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { CheckCircleOutline } from "@mui/icons-material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; import TextField from '@mui/material/TextField';
import 'animate.css';
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ADD_USER } from '../../utils/mutations.js';
import { useSelector, useDispatch } from 'react-redux'
import { setSuccessAlert, clearAlert, setErrorAlert } from '../../utils/feature/alertSlice.js';

import './style.css'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.jstudio.tech/">
        Jstudio
      </Link>
      {" "}{new Date().getFullYear()}

    </Typography>
  );
}

function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
  return randomNumber.toString();
}


const defaultTheme = createTheme();

function Signup() {
  const dispatch = useDispatch();
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);
  const successAlert = useSelector((state) => state.alert.successAlert);
  const errorAlert = useSelector((state) => state.alert.errorAlert);
  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const data = new FormData(event.currentTarget);
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
      if (token) {

        Auth.login(token);
        dispatch(setSuccessAlert("We are creating your account, please wait..."))
        setTimeout(() => {
          dispatch(clearAlert())
          window.location.assign('/');
        }, 3000)

      }

    } catch (err) {
      dispatch(setErrorAlert("System Error while creating account, please try again."));
      console.log(err);
    }


  };

  if (error) {
    dispatch(setErrorAlert("Please fill out all the fields correctly."))
  }

  return (

    <Container component="main" id='signUp' maxWidth="xs">
      <Box

        sx={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 10,


        }}
      >

        {successAlert && (
          <Alert className='animate__animated animate__fadeIn' icon={<CircularProgress size={20} color="success" />} severity="success">
            Successful, {successAlert}
          </Alert>)}
        {errorAlert && (

          <Alert className="animate__animated animate__fadeIn" icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
            Error, {errorAlert}
          </Alert>
        )}
        <Avatar sx={{ m: 1, bgcolor: 'black' }} >
          <LockIcon />

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
      <Copyright sx={{ mt: 2 }} marginRight={20} />
    </Container>
  );
}

export default Signup;