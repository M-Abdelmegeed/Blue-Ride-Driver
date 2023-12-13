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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useUserAuth } from "../UserAuthContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/loginReducer";
import Image from "../Assets/BlueRideASU.png";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Modal from "@mui/joy/Modal";
import { auth } from "../firebase-config";
import { updateProfile } from "firebase/auth";

export default function SignUp() {
  const { signUp } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9]+@eng\.asu\.edu\.eg$/;

    if (emailRegex.test(email)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        setShowModal(true);
        console.log("Passwords do not match");
        return;
      }

      const userCredential = await signUp(email, password);
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      console.log("Response object uid" + user.uid);
      dispatch(
        setCredentials({
          email: user.email,
          name: `${firstName} ${lastName}`,
          uid: user.uid,
        })
      );
      navigate("/home");
      console.log("Signup Successful");
    } catch (err) {
      console.log("The following error has occurred: " + err);
    }
  };

  return (
    <>
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
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
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
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={error}
                helperText={error ? "Invalid ASU email" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: blue[500] }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="afternoon-modal-title"
        aria-describedby="afternoon-modal-description"
      >
        <ModalDialog variant="solid">
          <ModalClose />
          <DialogTitle>Sorry, Passwords dont match!</DialogTitle>
        </ModalDialog>
      </Modal>
    </>
  );
}
