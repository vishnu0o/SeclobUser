import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFindAction,
  subCategoryCreateAction
} from "../Redux/Action/productAction";

function AddSubCategoryDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [error, setError] = useState({});


  // Reducers:::::

  let { categoryFindSuccess, categoryFindErr } = useSelector((state) => {
    return state.categoryFind;
  });

  useEffect(() => {
    dispatch(categoryFindAction());
  }, []);

  // Validation

  const validate = () => {
    let errors = {};

    if (category === "") {
      errors.category = "Category is required";
    }
    if (subCategory === "") {
      errors.subCategory = "Sub category is required";
    }

    console.log(errors, "errorserrorserrors");
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubCategory = () => {
    if (validate()) {
      dispatch(subCategoryCreateAction(category, subCategory));
      handleClose();
    }
  };

  console.log(category, "jcnwkjcn");

  return (
    <div>
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Select Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoryFindSuccess?.data?.map((value) => (
                      <MenuItem value={value?._id}>{value?.category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Add Category"
                  //   defaultValue="HP AMD Ryzen 3"
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: "15px" }}
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                />
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
                      onClick={handleCreateSubCategory}
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
    </div>
  );
}

export default AddSubCategoryDialog;
