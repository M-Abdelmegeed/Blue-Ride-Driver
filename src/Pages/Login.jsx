import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Image from "../Assets/BlueRideASU.png";
import SchoolIcon from "@mui/icons-material/School";
import { useUserAuth } from "../UserAuthContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/loginReducer";

const defaultTheme = createTheme();

export default function Login() {
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9]{7}@eng\.asu\.edu\.eg$/;

    if (emailRegex.test(email)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const userCredential = await logIn(
        data.get("email"),
        data.get("password")
      );
      const user = userCredential.user;
      console.log("Response object uid" + user.uid);
      dispatch(
        setCredentials({
          email: user.email,
          name: user.displayName,
          uid: user.uid,
        })
      );
      navigate("/home");
      console.log("Login Successfull");
    } catch (err) {
      console.log("The following error has occurred: " + err);
    }
    // navigate("/home");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            // backgroundSize:"cover",
            backgroundPosition: "center",
          }}
        />
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
            <Avatar sx={{ m: 1, bgcolor: blue[500] }}>
              <SchoolIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
                error={error}
                helperText={error ? "Invalid ASU email" : ""}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">@eng.asu.edu.eg</InputAdornment>
                //   ),
                // }}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: blue[500] }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
