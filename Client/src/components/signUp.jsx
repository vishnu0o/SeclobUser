import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUpSubmitAction } from "../Redux/Action/AuthAction";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  // Reducers

  let { authSignUpSuccess, authSignUpErr } = useSelector((state) => {
    return state.authSignUp;
  });

  // Validation

  const validate = () => {
    let errors = {};

    if (name === "") {
      errors.name = "Name is required";
    }
    if (email === "") {
      errors.email = "Email is required";
    }
    if (password === "") {
      errors.password = "Password is required";
    }
    console.log(errors, "errorserrorserrors");
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      dispatch(SignUpSubmitAction(name, email, password));
    }
  };

  // Data from local storage

  let isUserExist = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (isUserExist) {
      navigate("/home");
    }
  }, [isUserExist, authSignUpSuccess]);

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#013b62",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem"
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" gutterBottom>
          To keep connected with us please login with your personal info
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#fff",
            color: "#fff",
            marginTop: "2rem",
            padding: "0.8rem 2rem",
            borderRadius: "25px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#013b62"
            }
          }}
          onClick={() => navigate("/")}
        >
          Sign In
        </Button>
      </Grid>

      {/* Right Side - Sign Up */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#f8a400" gutterBottom>
          Create Account
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "400px",
            gap: "1rem",
            marginTop: "2rem"
          }}
        >
          {/* Name Input */}
          <TextField
            placeholder="Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
            onChange={(e) => {
              setName(e.target.value);
              setError((prevError) => ({ ...prevError, name: "" }));
            }}
            value={name}
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              "& fieldset": { border: "none" }
            }}
          />
          <Typography sx={{ color: "red" }}>{error?.name}</Typography>

          {/* Email Input */}
          <TextField
            placeholder="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              setError((prevError) => ({ ...prevError, email: "" }));
            }}
            value={email}
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              "& fieldset": { border: "none" }
            }}
          />

          <Typography sx={{ color: "red" }}>{error?.email}</Typography>

          {/* Password Input */}
          <TextField
            placeholder="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
            onChange={(e) => {
              setPassword(e.target.value);
              setError((prevError) => ({ ...prevError, password: "" }));
            }}
            value={password}
            sx={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              "& fieldset": { border: "none" }
            }}
          />

          <Typography sx={{ color: "red" }}>{error?.password}</Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f8a400",
              color: "#fff",
              padding: "0.8rem 2rem",
              borderRadius: "25px",
              marginTop: "1rem",
              "&:hover": {
                backgroundColor: "#e69c00"
              }
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
