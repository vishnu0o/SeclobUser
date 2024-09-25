import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  InputAdornment
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
// import { LoginSubmitAction } from "../Redux/Action/AuthAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTH_LOGIN_ERR } from "../Redux/Constants/AuthConstant";
import { LoginSubmitAction } from "../Redux/Action/AuthAction";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  // Reducer

  let { authLoginSuccess, authLoginErr } = useSelector((state) => {
    return state.authLogin;
  });

  // Validation

  const validate = () => {
    let errors = {};
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

  // HandleSubmit

  const handleLoginSubmit = () => {
    if (validate()) {
      dispatch(LoginSubmitAction(email, password));
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
  }, [isUserExist, authLoginSuccess]);

  useEffect(() => {
    if (authLoginErr?.status === false) {
      toast.success(authLoginErr.message);
      dispatch({ type: AUTH_LOGIN_ERR, payload: false });
    }
  }, [authLoginErr]);
  console.log(authLoginErr, "authLoginErrauthLoginErrauthLoginErrauthLoginErr");

  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "2rem"
          }}
        >
          <Typography
            variant="h4"
            color="#f8a400"
            fontWeight="bold"
            gutterBottom
          >
            Sign In to Your Account
          </Typography>

          {/* Sign In Form */}
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "400px",
              gap: "1.5rem",
              marginTop: "1rem"
            }}
          >
            {/* Email Input */}
            <TextField
              placeholder="Email"
              variant="outlined"
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
                backgroundColor: "#f6f8f7",
                borderRadius: "8px",
                "& fieldset": { border: "none" }
              }}
            />

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
                backgroundColor: "#f6f8f7",
                borderRadius: "8px",
                "& fieldset": { border: "none" }
              }}
            />

            <Link
              href="#"
              underline="none"
              sx={{
                alignSelf: "flex-start",
                color: "#444",
                fontSize: "0.9rem"
              }}
            >
              forgot password?
            </Link>

            {/* Sign In Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f8a400",
                color: "#fff",
                padding: "0.8rem 2rem",
                borderRadius: "25px",
                "&:hover": {
                  backgroundColor: "#e69c00"
                }
              }}
              onClick={handleLoginSubmit}
            >
              SIGN IN
            </Button>
          </Box>
        </Grid>

        {/* Right side - Hello Friend */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#013b62",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            padding: "2rem",
            position: "relative"
          }}
        >
          {/* The background pattern can be added with CSS for the geometric shapes */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Hello Friend!
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Enter your personal details and start your journey with us
          </Typography>

          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              padding: "0.8rem 2rem",
              borderRadius: "25px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#013b62"
              }
            }}
            onClick={() => navigate("/signIn")}
          >
            SIGN UP
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
