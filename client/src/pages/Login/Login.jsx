import * as React from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations.js";
import Auth from "../../utils/auth.js";

import {
  Box,
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material/";
import LockIcon from '@mui/icons-material/Lock';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "animate.css";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSuccessAlert,
  setErrorAlert,
  clearAlert,
} from "../../utils/feature/alertSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.jstudio.tech/">
        Jstudio
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  const [login, { error }] = useMutation(LOGIN);
  const dispatch = useDispatch();
  const SuccessAlert = useSelector((state) => state.alert.successAlert);
  const errorAlert = useSelector((state) => state.alert.errorAlert);
  if (error) {
    dispatch(setErrorAlert("Password is incorrect, please try again."));
    setTimeout(() => {
      dispatch(clearAlert());
    }, 2000)
    console.log(error);
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);

      const mutationResponse = await login({
        variables: { email: data.get("email"), password: data.get("password") },
      });
      const token = mutationResponse.data.login.token;

      Auth.login(token);

      dispatch(
        setSuccessAlert("Please Wait While We Retrieve Your Information...")
      );
      setTimeout(() => {
        dispatch(clearAlert());
        window.location.assign("/");
      }, 3000);
    } catch (err) {
      dispatch(setErrorAlert("Failed to login"));
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "1400px" }} width="100%">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="login-image" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {SuccessAlert && (
              <Alert
                className="animate__animated animate__fadeIn"
                icon={<CircularProgress size={20} color="success" />}
                severity="success"
              >
                Successful, {SuccessAlert}
              </Alert>
            )}
            {errorAlert && (
              <Alert
                className="animate__animated animate__fadeIn"
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
              >
                Error, {errorAlert}
              </Alert>
            )}

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
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
