import Products from "../database/Product.js";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { uploadFileToS3 } from "../utils/S3Upload.js";
import Wishlist from "../database/wishList.js";

// @desc    product Create
// @route   post /api/product/productCreate
// @access  user

export const productCreateController = asyncHandler(async (req, res) => {
  try {
    const formData = req.body;
    console.log(req.files, "formDataformDataformData");
    console.log(formData, "formdataaaaaaaaaaaaaaaaaaaaaaaaa");
    const vak = JSON.parse(formData?.varient);
    console.log(vak, "formdataaaaaaaaaaaaaaaaaaaaaaaaa");

    let uploadedImageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileData = fs.readFileSync(file.path);
        const fileName = `seclobTest${file.filename}`;
        const folderName = "ProductImage";
        const contentType = file.mimetype;
        const uploadImageUrl = await uploadFileToS3(
          fileData,
          fileName,
          folderName,
          contentType
        );
        uploadedImageUrls?.push(uploadImageUrl);
      }
    }
    const createProduct = await Products.create({
      title: formData?.title,
      variant: JSON.parse(formData?.varient),
      subCategory: formData?.subCategory,
      image: uploadedImageUrls ? uploadedImageUrls : "",
      description: formData?.description
    });
    res
      .status(200)
      .json({ message: "Product created successfully", status: true });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product Edit
// @route   post /api/product/productEdit
// @access  user

export const productEditController = asyncHandler(async (req, res) => {
  try {
    const formData = req.body;
    console.log(req.files, "formDataformDataformData");
    console.log(formData, "formdataaaaaaaaaaaaaaaaaaaaaaaaa");
    const vak = JSON.parse(formData?.varient);
    console.log(vak, "formdataaaaaaaaaaaaaaaaaaaaaaaaa");

    let uploadedImageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileData = fs.readFileSync(file.path);
        const fileName = `seclobTest${file.filename}`;
        const folderName = "ProductImage";
        const contentType = file.mimetype;
        const uploadImageUrl = await uploadFileToS3(
          fileData,
          fileName,
          folderName,
          contentType
        );
        uploadedImageUrls?.push(uploadImageUrl);
      }
    }
    const createProduct = await Products.updateOne(
      { _id: formData?.id },

      {
        $set: {
          title: formData?.title,
          variant: JSON.parse(formData?.varient),
          subCategory: formData?.subCategory,
          image: uploadedImageUrls?.length !== 0 ? uploadedImageUrls : formData?.images,
          description: formData?.description
        }
      }
    );
    res
      .status(200)
      .json({ message: "Product updated successfully", status: true });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product find
// @route   post /api/product/findProduct
// @access  user

export const productFindController = asyncHandler(async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5;
    const skipValue = (parseInt(page) - 1) * limit;
    const totalProducts = await Products.countDocuments();
    const findProduct = await Products.find({}).limit(limit).skip(skipValue);
    res.status(200).json({
      message: "Product find successfully",
      status: true,
      data: findProduct,
      totalCount: totalProducts
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product Search
// @route   get /api/product/productSearch
// @access  user

export const productSearchController = asyncHandler(async (req, res) => {
  try {
    const totalProducts = await Products.countDocuments();
    const findProduct = await Products.find({});
    res.status(200).json({
      message: "Products found successfully",
      status: true,
      data: findProduct,
      totalCount: totalProducts
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product findone
// @route   get /api/product/findOneProduct
// @access  user

export const productFindOneController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    const findProduct = await Products.findOne({ _id: id });
    res.status(200).json({
      message: "Product find successfully",
      status: true,
      data: findProduct
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product wishList create
// @route   get /api/product/createWishList
// @access  user

export const createWishListController = asyncHandler(async (req, res) => {
  try {
    const { productID, userID } = req.body;
    const createWishlist = await Wishlist.create({
      productID: productID,
      userID: userID
    });
    res.status(200).json({
      message: "Wishlist created successfully",
      status: true
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product wishList create
// @route   get /api/product/findWishlist
// @access  user

export const findWishListController = asyncHandler(async (req, res) => {
  try {
    const { userID } = req.query;
    const findWishlist = await Wishlist.find({
      userID: userID
    }).populate("productID");
    res.status(200).json({
      message: "Wishlist find successfully",
      status: true,
      data: findWishlist
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    product wishList delete
// @route   delete /api/product/deleteWishlist
// @access  user

export const deleteWishListController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    const findWishlist = await Wishlist.deleteOne({
      _id: id
    });
    res.status(200).json({
      message: "Wishlist delete successfully",
      status: true
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});
