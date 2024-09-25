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
  WISHLIST_FIND_SUCCESS,
} from "../Constants/ProductConstant";


export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        productCreateLoading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        productCreateLoading: false,
        productCreateSuccess: action.payload,
      };
    case PRODUCT_CREATE_ERR:
      return {
        ...state,
        productCreateLoading: false,
        productCreateErr: action.payload,
      };
    default:
      return state;
  }
};


export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return {
        ...state,
        productEditLoading: true,
      };
    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        productEditLoading: false,
        productEditSuccess: action.payload,
      };
    case PRODUCT_EDIT_ERR:
      return {
        ...state,
        productEditLoading: false,
        productEditErr: action.payload,
      };
    default:
      return state;
  }
};



export const productSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return {
        ...state,
        productSearchLoading: true,
      };
    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        productSearchLoading: false,
        productSearchSuccess: action.payload,
      };
    case PRODUCT_SEARCH_ERR:
      return {
        ...state,
        productSearchLoading: false,
        productSearchErr: action.payload,
      };
    default:
      return state;
  }
};

export const productFindReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FIND_REQUEST:
      return {
        ...state,
        productFindLoading: true,
      };
    case PRODUCT_FIND_SUCCESS:
      return {
        ...state,
        productFindLoading: false,
        productFindSuccess: action.payload,
      };
    case PRODUCT_FIND_ERR:
      return {
        ...state,
        productFindLoading: false,
        productFindErr: action.payload,
      };
    default:
      return state;
  }
};


export const productFindOneReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FINDONE_REQUEST:
      return {
        ...state,
        productFindOneLoading: true,
      };
    case PRODUCT_FINDONE_SUCCESS:
      return {
        ...state,
        productFindOneLoading: false,
        productFindOneSuccess: action.payload,
      };
    case PRODUCT_FINDONE_ERR:
      return {
        ...state,
        productFindOneLoading: false,
        productFindOneErr: action.payload,
      };
    default:
      return state;
  }
};



export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        categoryCreateLoading: true,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        categoryCreateLoading: false,
        categoryCreateSuccess: action.payload,
      };
    case CATEGORY_CREATE_ERR:
      return {
        ...state,
        categoryCreateLoading: false,
        categoryCreateErr: action.payload,
      };
    default:
      return state;
  }
};


export const categoryFindReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        categoryFindLoading: true,
      };
    case CATEGORY_FIND_SUCCESS:
      return {
        ...state,
        categoryFindLoading: false,
        categoryFindSuccess: action.payload,
      };
    case CATEGORY_FIND_ERR:
      return {
        ...state,
        categoryFindLoading: false,
        categoryFindErr: action.payload,
      };
    default:
      return state;
  }
};


export const subCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_CREATE_REQUEST:
      return {
        ...state,
        subCategoryCreateLoading: true,
      };
    case SUBCATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        subCategoryCreateLoading: false,
        subCategoryCreateSuccess: action.payload,
      };
    case SUBCATEGORY_CREATE_ERR:
      return {
        ...state,
        subCategoryCreateLoading: false,
        subCategoryCreateErr: action.payload,
      };
    default:
      return state;
  }
};


export const wishlistCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_CREATE_REQUEST:
      return {
        ...state,
        wishlistCreateLoading: true,
      };
    case WISHLIST_CREATE_SUCCESS:
      return {
        ...state,
        wishlistCreateLoading: false,
        wishlistCreateSuccess: action.payload,
      };
    case WISHLIST_CREATE_ERR:
      return {
        ...state,
        wishlistCreateLoading: false,
        wishlistCreateErr: action.payload,
      };
    default:
      return state;
  }
};


export const wishlistFindReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_FIND_REQUEST:
      return {
        ...state,
        wishlistFindLoading: true,
      };
    case WISHLIST_FIND_SUCCESS:
      return {
        ...state,
        wishlistFindLoading: false,
        wishlistFindSuccess: action.payload,
      };
    case WISHLIST_FIND_ERR:
      return {
        ...state,
        wishlistFindLoading: false,
        wishlistFindErr: action.payload,
      };
    default:
      return state;
  }
};



export const wishlistDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_DELETE_REQUEST:
      return {
        ...state,
        wishlistDeleteLoading: true,
      };
    case WISHLIST_DELETE_SUCCESS:
      return {
        ...state,
        wishlistDeleteLoading: false,
        wishlistDeleteSuccess: action.payload,
      };
    case WISHLIST_DELETE_ERR:
      return {
        ...state,
        wishlistDeleteLoading: false,
        wishlistDeleteErr: action.payload,
      };
    default:
      return state;
  }
};
