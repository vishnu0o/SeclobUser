import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { authLoginReducer, authSignUpReducer } from "./Redux/Reducer/AuthReducer";
import {
  categoryCreateReducer,
  categoryFindReducer,
  productCreateReducer,
  productEditReducer,
  productFindOneReducer,
  productFindReducer,
  productSearchReducer,
  subCategoryCreateReducer,
  wishlistCreateReducer,
  wishlistDeleteReducer,
  wishlistFindReducer,
} from "./Redux/Reducer/ProductReducer";


let Middleware = [thunk];

const appReducer = combineReducers({
  authLogin: authLoginReducer,
  authSignUp:authSignUpReducer,
  productCreate:productCreateReducer,
  productEdit:productEditReducer,
  productFind: productFindReducer,
  productSearch:productSearchReducer,
  productFindOne: productFindOneReducer,
  categoryCreate:categoryCreateReducer,
  categoryFind:categoryFindReducer,
  subCategoryCreate:subCategoryCreateReducer,
  wishlistCreate:wishlistCreateReducer,
  wishlistFind:wishlistFindReducer,
  wishlistDelete:wishlistDeleteReducer
 
});

export const store = createStore(appReducer, applyMiddleware(...Middleware));
