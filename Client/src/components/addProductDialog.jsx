import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFindAction,
  ProductCreateAction
} from "../Redux/Action/productAction";

const AddProductForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [variants, setVariants] = useState([{ ram: "", price: "", quantity: 1 }]);
  const [subCategoryMapData, setSubCategoryMapData] = useState([]);
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  // Reducers:::::

  let { categoryFindSuccess, categoryFindErr } = useSelector((state) => {
    return state.categoryFind;
  });

  useEffect(() => {
    dispatch(categoryFindAction());
  }, []);

  useEffect(() => {
    if (categoryFindSuccess) {
      setSubCategoryMapData(
        categoryFindSuccess?.data.flatMap((value) => value.subCategory)
      );
    }
  }, [categoryFindSuccess]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleQtyChange = (index, change) => {
    console.log(index, change, "changeessssssssssssssss");
    const newVariants = [...variants];
    const newQty = newVariants[index].quantity + change;
    console.log(newQty, "newQtynewQtynewQty");
    if (newQty > 0) {
      newVariants[index].quantity = newQty;
    }
    setVariants(newVariants);
  };

  const addVariant = () => {
    const newVariant = { ram: "", price: "", quantity: 1 };
    setVariants([...variants, newVariant]);
  };

  // Handle file Change :::::::::::

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);

    console.log(filesArray, "Converted file array");

    if (filesArray.length) {
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  // Handle Remove image ::::::::::

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // handleProduct add ::::::::::::

  console.log(variants,"variantvariant")

  const handleProductAdd = () => {
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subCategory", subCategory);
    formData.append("description", description);
    images.forEach((file, index) => {
      formData.append("images", file);
    });
    formData.append("varient", JSON.stringify(variants));
    dispatch(ProductCreateAction(formData));
    handleClose();
  };

  console.log(subCategoryMapData, "subCategoryMapDatasubCategoryMapData");
  console.log(categoryFindSuccess, "categoryFindSuccesscategoryFindSuccess");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      PaperProps={{
        style: {
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          minWidth: "820px",
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
        Add Product
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
                label="Title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            {/* Variants */}
            <Grid item xs={12}>
              <Typography variant="body1">Variants :</Typography>
              {variants.map((variant, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  sx={{ mt: 1, mb: 1 }}
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <TextField
                      label="Ram"
                      value={variant.ram}
                   
                      onChange={(e) =>
                        handleVariantChange(index, "ram", e.target.value)
                      }                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Price"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>QTY:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton onClick={() => handleQtyChange(index, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={variant.quantity}
                      size="small"
                      style={{ width: "40px", textAlign: "center" }}
                    />
                    <IconButton onClick={() => handleQtyChange(index, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addVariant}
              >
                Add variants
              </Button>
            </Grid>

            {/* Subcategory */}
            <Grid item xs={12}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Sub Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subCategory}
                    label="Select Sub Category"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    {subCategoryMapData?.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Typography variant="body1">Upload image:</Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {images?.map((value, index) => (
                  <Grid item key={index} sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        position: "relative"
                      }}
                      src={URL.createObjectURL(value)}
                      alt={`Uploaded image ${index + 1}`}
                    />
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" }
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                ))}
                <Grid item>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      border: "2px dashed #ccc",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      style={{
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        margin: 0,
                        padding: 0,
                        zIndex: 1
                      }}
                    />
                    <IconButton
                      color="primary"
                      component="span"
                      sx={{ zIndex: 2 }}
                    >
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
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
                    onClick={handleProductAdd}
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
  );
};

export default AddProductForm;
