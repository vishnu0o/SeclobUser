import axios from "../../Axios/config";
import {
  CATEGORY_CREATE_ERR,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_FIND_ERR,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  PRODUCT_CREATE_ERR,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_EDIT_ERR,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_FIND_ERR,
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
  PRODUCT_FINDONE_ERR,
  PRODUCT_FINDONE_REQUEST,
  PRODUCT_FINDONE_SUCCESS,
  PRODUCT_SEARCH_ERR,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  SUBCATEGORY_CREATE_ERR,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  WISHLIST_CREATE_ERR,
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_DELETE_ERR,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_SUCCESS,
  WISHLIST_FIND_ERR,
  WISHLIST_FIND_REQUEST,
  WISHLIST_FIND_SUCCESS
} from "../Constants/ProductConstant";

// ProductFind Action

export const ProductCreateAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    let { data } = await axios.post("/product/productCreate",formData, config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_CREATE_ERR, payload: error.response.data });
  }
};


// ProductEdit Action

export const ProductEditAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    let { data } = await axios.put("/product/productEdit",formData, config);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_EDIT_ERR, payload: error.response.data });
  }
};




// ProductSearch Action

export const ProductSearchAction = (searchKey) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });
    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    let { data } = await axios.get(`/product/productSearch?searchKey${searchKey}`,config);
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_SEARCH_ERR, payload: error.response.data });
  }
};




// ProductFind Action

export const ProductFindAction = (currentPage) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_FIND_REQUEST });
    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    let { data } = await axios.get(`/product/findProduct?page=${currentPage}`, config);
    dispatch({ type: PRODUCT_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_FIND_ERR, payload: error.response.data });
  }
};

// ProductFindOne Action

export const ProductFindOneAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_FINDONE_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };

    let { data } = await axios.get(`/product/findOneProduct?id=${id}`, config);
    dispatch({ type: PRODUCT_FINDONE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_FINDONE_ERR, payload: error.response.data });
  }
};

// Category create Action

export const categoryCreateAction =
  (categoryName) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST });

      let isUserExist = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      const config = {
        headers: {
          Authorization: `Bearer ${isUserExist?.token}`
        }
      };
      let { data } = await axios.post("/product/createCategory",{categoryName}, config);
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response, "error.response");
      dispatch({ type: CATEGORY_CREATE_ERR, payload: error.response.data });
    }
  };

// Category find Action

export const categoryFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_FIND_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    let { data } = await axios.get("/product/categoryFind", config);
    dispatch({ type: CATEGORY_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: CATEGORY_FIND_ERR, payload: error.response.data });
  }
};

// subCategory create Action

export const subCategoryCreateAction =
  (categoryId, subCategoryName) => async (dispatch, getState) => {
    try {
      dispatch({ type: SUBCATEGORY_CREATE_REQUEST });

      let isUserExist = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      const config = {
        headers: {
          Authorization: `Bearer ${isUserExist?.token}`
        }
      };
      let { data } = await axios.post(
        "/product/createSubCategory",
        { categoryId, subCategoryName },
        config
      );
      dispatch({ type: SUBCATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response, "error.response");
      dispatch({ type: SUBCATEGORY_CREATE_ERR, payload: error.response.data });
    }
  };



  
// wishlist create Action

export const wishlistCreateAction =
(productID) => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_CREATE_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    const userID = isUserExist?.UserId
    let { data } = await axios.post(
      "/product/createWishList",
      { productID, userID },
      config
    );
    dispatch({ type: WISHLIST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: WISHLIST_CREATE_ERR, payload: error.response.data });
  }
};



// wishlist find Action

export const wishlistFindAction =
() => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_FIND_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    const userID = isUserExist?.UserId
    let { data } = await axios.get(
      `/product/findWishlist?userID=${userID}`,
      config
    );
    dispatch({ type: WISHLIST_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: WISHLIST_FIND_ERR, payload: error.response.data });
  }
};


// wishlist delete Action

export const wishlistDeleteAction =
(id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WISHLIST_DELETE_REQUEST });

    let isUserExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    const config = {
      headers: {
        Authorization: `Bearer ${isUserExist?.token}`
      }
    };
    const userID = isUserExist?.UserId
    let { data } = await axios.delete(
      `/product/deleteWishlist?id=${id}`,
      config
    );
    dispatch({ type: WISHLIST_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: WISHLIST_DELETE_ERR, payload: error.response.data });
  }
};
