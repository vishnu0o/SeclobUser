import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Badge,
  Box,
  Typography,
  MenuItem,
  Menu,
  Tooltip,
  Avatar,
  Drawer,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import {
  FavoriteBorder,
  ShoppingCart,
  AccountCircle
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductSearchAction,
  wishlistDeleteAction,
  wishlistFindAction
} from "../Redux/Action/productAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


// Custom styling for search input and button
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.white, 1),
  borderRadius: theme.shape.borderRadius * 2,
  marginRight: theme.spacing(2),
  padding: "2px 10px",
  width: "fit-content"
}));

const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: `0 ${theme.shape.borderRadius * 2}px ${
    theme.shape.borderRadius * 2
  }px 0`,
  backgroundColor: "#F4A100",
  color: "#fff",
  "&:hover": {
    backgroundColor: alpha("#F4A100", 0.85)
  }
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [open, setOpen] = useState(false);

  // Reducer :::::::::::::

  let { wishlistFindSuccess, wishlistFindErr } = useSelector((state) => {
    return state.wishlistFind;
  });

  let { wishlistDeleteSuccess, wishlistDeleteErr } = useSelector((state) => {
    return state.wishlistDelete;
  });

  // profile handlers
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginInfo");
    navigate('/')
  };

  const handleSearch = () => {
    dispatch(ProductSearchAction(searchKey));
  };

  useEffect(() => {
    dispatch(wishlistFindAction());
  }, [dispatch, wishlistDeleteSuccess]);

  const products = [
    { title: "HP AMD Ryzen 3", price: 529.99, image: "path/to/laptop/image" },
    { title: "HP AMD Ryzen 3", price: 529.99, image: "path/to/laptop/image" }
  ];
  const ProductCard = ({ title, price, image, id }) => {
    return (
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          width: "100%",
          maxWidth: 600
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ width: 100, height: 100, objectFit: "contain" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {`$${price}`}
          </Typography>
        </CardContent>
        <IconButton
          aria-label="remove"
          onClick={() => dispatch(wishlistDeleteAction(id))}
        >
          <CloseIcon />
        </IconButton>
      </Card>
    );
  };
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <Typography variant="h5" component="h1" sx={{ ml: 1 }}>
              Items
            </Typography>
          </Box>

          {wishlistFindSuccess?.data?.length == 0 && (
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
                maxWidth: 600
              }}
            >
              <Typography sx={{ width: "100%", maxWidth: 600 }}>
                No wishList
              </Typography>
            </Card>
          )}

          {wishlistFindSuccess?.data?.map((product, index) => (
            <ProductCard
              key={index}
              title={product.productID?.title}
              price={product.productID?.variant[0]?.price}
              image={product.productID?.image[0]}
              id={product?._id}
            />
          ))}
        </Box>
      </Drawer>

      <AppBar
        position="static"
        sx={{ backgroundColor: "#003E61", padding: "10px 0" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search>
              <InputBase
                placeholder="Search any things"
                sx={{ paddingLeft: 2, paddingRight: 2, width: "250px" }}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <SearchButton variant="contained" onClick={handleSearch}>
                Search
              </SearchButton>
            </Search>
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Favorites Icon with Badge */}
            <IconButton sx={{ color: "#fff" }} onClick={() => setOpen(true)}>
              <Badge badgeContent={0} color="warning">
                <FavoriteBorder />
              </Badge>
            </IconButton>

            {/* Sign in Button */}
            <Typography variant="button" sx={{ color: "#fff", mx: 2 }}>
              Sign in
            </Typography>

            {/* Cart Icon with Badge */}
            <IconButton sx={{ color: "#fff" }}>
              <Badge badgeContent={0} color="warning">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Cart Label */}
            <Typography variant="button" sx={{ color: "#fff", ml: 1 }}>
              Cart
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={"./avatar.png"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
