import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Button,
  IconButton
} from "@mui/material";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductFindOneAction } from "../Redux/Action/productAction";
import { ButtonGroup, TextField } from "@mui/material";
import EditProductForm from "./editProductDialog";
import { PRODUCT_EDIT_SUCCESS } from "../Redux/Constants/ProductConstant";

const ProductDetail = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [addToCart, setAddToCart] = useState(1);
  const [open, setOpen] = useState(false);


  // Reducer

  let { productFindOneSuccess, productFindOneErr } = useSelector((state) => {
    return state.productFindOne;
  });

  
  let { productEditSuccess, productEditErr } = useSelector((state) => {
    return state.productEdit;
  });

  // Data from local storage

  let isUserExist = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;

  // useEffect(() => {
  //   if (!isUserExist) {
  //     navigate("/login");
  //   }
  // }, [isUserExist]);

  useEffect(() => {
    dispatch(ProductFindOneAction(id));
  }, [dispatch,productEditSuccess]);

  useEffect(() => {
    if (productFindOneSuccess) {
      setData(productFindOneSuccess?.data);
    }
  }, [productFindOneSuccess]);

  useEffect(() => {
    if (productEditSuccess) {
      Swal.fire("Success", "Updated successfully", "success");
      dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: false });
    }
   
  }, [productEditSuccess,]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedRam, setSelectedRam] = useState(4);

  const handleQuantityChange = (value) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };

  const handleRamChange = (ram) => {
    setSelectedRam(ram);
  };

  const handleClose = ()=>{
    setOpen(false)
  }

  console.log(
    productFindOneSuccess,
    "productFindOneSuccessproductFindOneSuccess"
  );

  return (
    <>
      <Container>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            {/* Product Images */}
            <Box>
              <img
                src={data?.image ? data?.image[0] : ""}
                alt="product"
                style={{ width: "100%" }}
              />
              <Grid container spacing={2} mt={2}>
                {data?.image?.map((value) => (
                  <Grid item xs={2}>
                    <img
                      src={value}
                      alt="thumbnail"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                ))}
                {/* <Grid item xs={6}>
                  <img
                    src="./sampleComputer.jpg"
                    alt="thumbnail"
                    style={{ width: "100%" }}
                  />
                </Grid> */}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Product Info */}
            <Typography variant="h5">{data?.title}</Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ${data?.variant ? data?.variant[0]?.price : ""}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Availability: <span style={{ color: "green" }}>In stock</span>
            </Typography>
            <Typography variant="body2" color="error" gutterBottom>
              Hurry up! Only 34 product left in stock!
            </Typography>

            {/* RAM Options */}
            <Typography variant="subtitle1" gutterBottom>
              Ram:
            </Typography>
            

            <ButtonGroup>
              {data?.variant?.map((value)=>(
                <Button
                  key={value?.ram}
                  variant={selectedRam === value?.ram ? "contained" : "outlined"}
                  onClick={() => handleRamChange(value?.ram)}
                >
                  {value?.ram} GB
                </Button>
              ))}
            </ButtonGroup>

            {/* Quantity */}
            <Typography variant="subtitle1" mt={2}>
              Quantity:
            </Typography>
            <ButtonGroup>
              <Button onClick={() => handleQuantityChange(-1)}>-</Button>
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                size="small"
                style={{ width: "60px", textAlign: "center" }}
              />
              <Button onClick={() => handleQuantityChange(1)}>+</Button>
            </ButtonGroup>

            {/* Actions */}
            <Grid container spacing={2} mt={2} sx={{ alignItems: "center" }}>
              <Grid item>
                {/* <Button variant="contained" color="primary">
                  Buy it now
                </Button> */}
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
                >
                  Buy it now
                </Button>
              </Grid>
              <Grid item>
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
                  onClick={()=>setOpen(true)}
                >
                  Edit Product
                </Button>
              </Grid>
             
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {open && <EditProductForm open={open} handleClose={handleClose} id={id} />}

    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default ProductDetail;
