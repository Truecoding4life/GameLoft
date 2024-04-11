import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { LOGIN } from '../utils/mutations';
import { DO_SUCCESS_ALERT, CLOSE_ALERT } from '../utils/actions.js';
import Auth from '../utils/auth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import {FormControlLabel, Box} from '@mui/material/';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { CheckCircleOutline } from '@mui/icons-material';

import loginImage from '../images/PageBackgrounds/login.webp';



function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://jstudio.tech/">
          Jstudio
        </Link>
       {" "}{new Date().getFullYear()}
      
      </Typography>
    );
  }

const defaultTheme = createTheme();

function Login () {
  const [login, { error }] = useMutation(LOGIN);
  const [state, dispatch] = useStoreContext();
  const SuccessAlert = state.successAlert;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
      try {
      const data = new FormData(e.currentTarget);
    

      const mutationResponse = await login({
        variables: { email: data.get('email'), password: data.get('password') },
      });
      const token = mutationResponse.data.login.token;
      
        Auth.login(token);

        dispatch({
          type: DO_SUCCESS_ALERT,
          successAlert: "Please Wait While We Retrieve Your Information...",
        });
        setTimeout(() => { 
          dispatch({
            type: CLOSE_ALERT,
          })
          window.location.assign('/');

        }, 4000)
   
      }
      catch(err){
        console.log(err)
      }
      
    
  };



      return (
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: '1400px' }} width='100%'>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              className='login-image'
              
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {SuccessAlert && ( 
                  <Alert icon={<CircularProgress size={20} color="success" />} severity="success">
          Successful, {SuccessAlert}
        </Alert>
                )}
                 
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                   
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  
                  />
                  {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}

                  >
                    Sign In
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid> */}
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    }
export default Login;

