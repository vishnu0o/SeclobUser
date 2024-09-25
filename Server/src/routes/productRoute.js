import express from "express";
import {
  createWishListController,
  deleteWishListController,
  findWishListController,
  productCreateController,
  productEditController,
  productFindController,
  productFindOneController,
  productSearchController
} from "../controller/productController.js";
import auth from "../middleware/auth.js";
import {
  createCategoryController,
  createSubCategoryController,
  findCategoryController
} from "../controller/categoryController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router
  .route("/productCreate")
  .post(upload.array("images", 10), auth, productCreateController);

router
  .route("/productEdit")
  .put(upload.array("images", 10), auth, productEditController);
router.route("/productSearch").get(auth, productSearchController);
router.route("/findProduct").get(auth, productFindController);
router.route("/findOneProduct").get(auth, productFindOneController);
router.route("/createCategory").post(auth, createCategoryController);
router.route("/categoryFind").get(auth, findCategoryController);
router.route("/createSubCategory").post(auth, createSubCategoryController);
router.route("/createWishList").post(auth, createWishListController);
router.route("/findWishlist").get(auth, findWishListController);
router.route("/deleteWishlist").delete(auth, deleteWishListController);

export default router;
