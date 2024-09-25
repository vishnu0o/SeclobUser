import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { categoryCreateAction } from "../Redux/Action/productAction";

function AddCategoryDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState({});

  // Validation

  const validate = () => {
    let errors = {};

    if (categoryName === "") {
      errors.categoryName = "CategoryName is required";
    }

    console.log(errors, "errorserrorserrors");
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  // HandleCreateCategory Action

  const handleCreateCategory = () => {
    if (validate()) {
      dispatch(categoryCreateAction(categoryName));
      handleClose()
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          style: {
            minHeight: "25vh",
            display: "flex",
            flexDirection: "column",
            minWidth: "500px",
            backgroundColor: "white",
            borderRadius: "12px"
          }
        }}
      >
        <DialogTitle
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "black",
            textAlign: "center"
          }}
        >
          Add Category
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: "auto", // Enable vertical scrolling
            "::-webkit-scrollbar": {
              width: "8px" // Scrollbar width
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "#2C2C2E" // Track color
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#585858", // Thumb color
              borderRadius: "4px" // Rounded corners
            }
          }}
        >
          <Container>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="Add Category"
                  //   defaultValue="HP AMD Ryzen 3"
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: "15px" }}
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    setError((prevError) => ({ ...prevError, categoryName: "" }));
                  }}
                />
                <Typography sx={{ color: "red" }}>
                  {error?.categoryName}
                </Typography>
              </Grid>
              {/* Buttons */}
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button variant="outlined" onClick={handleClose}>
                      DISCARD
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateCategory}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCategoryDialog;
