import React, { useState } from "react";

import {
  Button,
  TextField,
  Grid2,
  Container,
  Typography,
  Grid,
  Stack,
  Link,
  CssBaseline,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { updateUser } from "../slices/user-slice";
import { useAppDispatch } from "../app/hooks";
// import { addUser, getUserByEmail } from "../database/txns";
import { AppUser } from "../model/backend_model";
import { signUp, signIn } from "aws-amplify/auth";

class MyCustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

type LoginProps = {
  // updateLoggedIn: (loginStatus: boolean) => void;
  loginReason: string;
  initiatedFrom: string;
  handleAfterLogin: (isSignedIn: boolean, userId: string) => void;
};

export const Login: React.FC<LoginProps> = ({
  loginReason,
  initiatedFrom,
  handleAfterLogin,
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [mobile, setMobile] = useState("");
  const [lang1, setLang1] = useState("");
  const [lang2, setLang2] = useState("");
  const [lang3, setLang3] = useState("");
  const [lang4, setLang4] = useState("");

  const [error, setError] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");
  const [stateSignUp, setSignUp] = useState<string>("no");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const location = useLocation();

  const navigate = useNavigate();

  const GoogleSignInButton: React.FC = () => {
    const handleSignIn = async () => {};

    return (
      <div>
        <Button
          size="small"
          variant="contained"
          onClick={handleSignIn}
          sx={{
            textTransform: "none",
            width: "100%",
            backgroundColor: "green",
          }}
        >
          Sign In with Google
        </Button>

        {error && <p>{error}</p>}
      </div>
    );
  };

  const handleEmailLogin = async () => {
    try {
      await signIn({ username: email, password });
      console.log("User logged in ");
      dispatch(
        updateUser({
          id: "taj",
          email: email,
          mobile: "123",
          admin: true,
          displayName: "taj",
          firstName: "Madhu",
          lastName: "Mopuru",
          lang1: "E",
          lang2: "E",
          lang3: "E",
          lang4: "E",
          signedIn: true,
          signInType: "email",
          error: "",
          loginFor: "",
        })
      );
    } catch (err: unknown) {
      console.log("Error while logging in ");
    }

    console.log("email:", email);
    console.log("Password:", password);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signUp({
        username: email, // username is usually the email
        password,
        options: {
          userAttributes: {
            email, // Required user attribute
          },
        },
      });
      // setIsConfirming(true);
    } catch (err) {
      console.log((err as Error).message);
      setError((err as Error).message);
    }

    setPassword("");
    setSignUp("no");
    setIsSignUp(true);
  };

  const handleNewUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setDisplayName("");
    setMobile("");
    setLang1("");
    setLang2("");
    setLang3("");
    setLang4("");
    setIsSignUp(false);
    setSignUp("yes");
  };

  if (stateSignUp == "yes") {
    // Sign up screen
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
          <Grid2 container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="firstName"
                label="First Name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="mobile"
                label="Mobile"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <TextField
                variant="outlined"
                fullWidth
                name="lang1"
                label="Lang1"
                id="lang1"
                value={lang1}
                onChange={(e) => setLang1(e.target.value)}
              />

              <TextField
                variant="outlined"
                fullWidth
                name="lang2"
                label="Lang2"
                id="lang2"
                value={lang2}
                onChange={(e) => setLang2(e.target.value)}
              />

              <TextField
                variant="outlined"
                fullWidth
                name="lang3"
                label="Lang3"
                id="lang3"
                value={lang3}
                onChange={(e) => setLang3(e.target.value)}
              />

              <TextField
                variant="outlined"
                fullWidth
                name="lang4"
                label="Lang4"
                id="lang4"
                value={lang4}
                onChange={(e) => setLang4(e.target.value)}
              />
            </Grid>
          </Grid2>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          {signUpError !== "" && <Typography>{signUpError}</Typography>}
        </form>
      </Container>
    );
  } else {
    // Login screen
    return (
      <Container maxWidth="xs">
        <Grid2
          display={"flex"}
          container
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          {loginReason !== "" && (
            <Typography variant="h5" align="center">
              {"Login to "} {loginReason}
            </Typography>
          )}
          {isSignUp && (
            <Typography variant="h5" align="center">
              You have successfully Signed up. Please login to continue.
            </Typography>
          )}
          {loginReason == "" && (
            <Typography variant="h5" align="center">
              Login
            </Typography>
          )}

          <TextField
            label="email"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              handleEmailLogin();
            }}
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
          <Box sx={{ paddingTop: 2, width: "100%" }}>
            <GoogleSignInButton />
          </Box>

          <Stack
            direction={"row"}
            alignContent={"flex-end"}
            justifyContent={"flex-end"}
            sx={{ paddingTop: 2, width: "100%" }}
          >
            <Link
              component="button"
              variant="body1"
              onClick={handleNewUserClick}
            >
              New User?
            </Link>
          </Stack>

          {isLoggedIn && (
            <Typography
              variant="h6"
              sx={{
                color: "green",
                paddingTop: 2,
              }}
            >
              {" "}
              Success.. redirecting
            </Typography>
          )}
        </Grid2>
      </Container>
    );
  }
};

export default Login;
