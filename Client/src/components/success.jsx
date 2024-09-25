import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home"); // Change the path to where you want to redirect
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 100, color: "green", mb: 3 }} />
        <Typography variant="h4" gutterBottom>
          Success!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your order has been placed successfully.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleGoBack}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage;
