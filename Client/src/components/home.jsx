import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  MenuItem,
  Backdrop,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFindAction,
  ProductFindAction,
  wishlistCreateAction,
  wishlistFindAction
} from "../Redux/Action/productAction";
import {
  Checkbox,
  FormControlLabel,
  Pagination,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddProductForm from "./addProductDialog";
import AddCategoryDialog from "./addCategoryDialog";
import AddSubCategoryDialog from "./addSubCategoryDialog";
import Swal from "sweetalert2";
import {
  CATEGORY_CREATE_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_SUCCESS
} from "../Redux/Constants/ProductConstant";
import TableNoItemComponent from "./ReusableComponents/TableNoItemComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Reducer

  let { productFindSuccess, productFindErr } = useSelector((state) => {
    return state.productFind;
  });

  let { productSearchSuccess, productSearchErr } = useSelector((state) => {
    return state.productSearch;
  });

  let { productCreateSuccess, productCreateLoading, productCreateErr } =
    useSelector((state) => {
      return state.productCreate;
    });

  let { categoryCreateSuccess, categoryCreateErr } = useSelector((state) => {
    return state.categoryCreate;
  });

  let { subCategoryCreateSuccess, subCategoryCreateErr } = useSelector(
    (state) => {
      return state.subCategoryCreate;
    }
  );

  let { categoryFindSuccess, categoryFindErr } = useSelector((state) => {
    return state.categoryFind;
  });

  let { wishlistFindSuccess, wishlistFindErr } = useSelector((state) => {
    return state.wishlistFind;
  });

  useEffect(() => {
    dispatch(categoryFindAction());
    dispatch(wishlistFindAction());
  }, [dispatch, categoryCreateSuccess, subCategoryCreateSuccess,favorites]);

  useEffect(() => {
    setCategory(categoryFindSuccess?.data);
  }, [categoryFindSuccess]);

  // Handle submit for logout:::::::::::::::::::::::::::::::::::

  const handleLoginSubmit = () => {
    localStorage.removeItem("loginInfo");
    setAnchorElUser(null);
    navigate("/login");
  };

  // Data from local storage

  let isUserExist = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  useEffect(() => {
    if (!isUserExist) {
      navigate("/");
    }
  }, [isUserExist]);

  useEffect(() => {
    dispatch(ProductFindAction(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (productFindSuccess) {
      setData(productFindSuccess?.data);
    }
  }, [dispatch, productFindSuccess]);

  // profile handlers
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCategory = () => {
    setOpenCategory(false);
  };
  const handleCloseSubCategory = () => {
    setOpenSubCategory(false);
  };

  // Pagnation

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // value is the current page number
    console.log("Current Page:", value);
  };

  // Success msg ::::::::::::::

  useEffect(() => {
    if (categoryCreateSuccess) {
      Swal.fire("Success", "Category created successfully", "success");
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: false });
    }
    if (subCategoryCreateSuccess) {
      Swal.fire("Success", "Sub Category created successfully", "success");
      dispatch({ type: SUBCATEGORY_CREATE_SUCCESS, payload: false });
    }
    if (productCreateSuccess) {
      Swal.fire("Success", "Product created successfully", "success");
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: false });
    }
  }, [categoryCreateSuccess, subCategoryCreateSuccess, productCreateSuccess]);

  // Filter

  const handleFilter = (isChecked, data) => {
    if (isChecked == true) {
      setSelectedSubcategory(data);

      setData(
        productFindSuccess?.data?.filter((item) => {
          console.log(data, "dataaaaaaaaaaaa");
          return item.subCategory.toLowerCase().includes(data.toLowerCase());
        })
      );
    } else {
      setSelectedSubcategory(null);
      setData(productFindSuccess?.data);
    }
  };

  const handleFavoriteToggle = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
    dispatch(wishlistCreateAction(productId));
  };

  console.log(wishlistFindSuccess, "wishlistFindSuccesswishlistFindSuccess");
  return (
    <>
      {productCreateLoading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={productCreateLoading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container maxWidth="lg">
        {/* Main Content */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f8a400",
              color: "#fff",
              padding: "0.8rem 2rem",
              borderRadius: "25px",
              marginTop: "1rem",
              ml: 2,
              "&:hover": {
                backgroundColor: "#e69c00"
              }
            }}
            onClick={() => setOpenCategory(true)}
          >
            Add Category
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f8a400",
              color: "#fff",
              padding: "0.8rem 2rem",
              borderRadius: "25px",
              marginTop: "1rem",
              ml: 2,
              "&:hover": {
                backgroundColor: "#e69c00"
              }
            }}
            onClick={() => setOpenSubCategory(true)}
          >
            Add SubCategory
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f8a400",
              color: "#fff",
              padding: "0.8rem 2rem",
              borderRadius: "25px",
              marginTop: "1rem",
              ml: 2,
              "&:hover": {
                backgroundColor: "#e69c00"
              }
            }}
            onClick={() => setOpen(true)}
          >
            Add Product
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mt: 5, mb: 5 }}>
          {/* Categories Sidebar */}
          <Grid item xs={3}>
            <Typography variant="h6">Categories</Typography>
            <List>
              {category?.map((category, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={category.category} />
                  </ListItem>
                  {category?.subCategory?.length > 0 && (
                    <List component="div" disablePadding>
                      {category.subCategory.map((subcategory, idx) => (
                        <ListItem key={idx} sx={{ pl: 4 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedSubcategory === subcategory} // Check if it's the selected one
                                onChange={(e) =>
                                  handleFilter(e.target.checked, subcategory)
                                }
                              />
                            }
                            label={subcategory}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Grid>

          {/* Product Grid */}
          <Grid item xs={9}>
            <Grid container spacing={3}>
              {data.length == 0 && (
                <Grid container justifyContent="center" alignItems="center">
                  <TableNoItemComponent />
                </Grid>
              )}
              {data.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ maxWidth: 345 }} onClick = {()=>navigate(`/productDetail/${product?._id}`)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image[0]}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.variant[0].price}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                        pb: 2
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<AddShoppingCart />}
                      >
                        Add to Cart
                      </Button>
                      <IconButton
                        onClick={() => handleFavoriteToggle(product._id)}
                      >
                        {wishlistFindSuccess.data?.some(
                          (item) => item.productID._id === product._id
                        ) ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              {productFindSuccess?.totalCount && (
                <Typography variant="body2">{`${data?.length} of ${productFindSuccess?.totalCount} items`}</Typography>
              )}
              <Pagination
                count={10}
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Show</Typography>
                <Select defaultValue={10} size="small" sx={{ mx: 1 }}>
                  <MenuItem value={10}>10 rows</MenuItem>
                  <MenuItem value={20}>20 rows</MenuItem>
                  <MenuItem value={50}>50 rows</MenuItem>
                </Select>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {open && <AddProductForm open={open} handleClose={handleClose} />}
      {openCategory && (
        <AddCategoryDialog
          open={openCategory}
          handleClose={handleCloseCategory}
        />
      )}
      {openSubCategory && (
        <AddSubCategoryDialog
          open={openSubCategory}
          handleClose={handleCloseSubCategory}
        />
      )}
    </>
  );
};

export default Home;
