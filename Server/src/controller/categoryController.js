import asyncHandler from "express-async-handler";
import Category from "../database/category.js";

// @desc    category Create
// @route   post /api/product/createCategory
// @access  user

export const createCategoryController = asyncHandler(async (req, res) => {
  try {
    const { categoryName } = req.body;
    const isCategoryExist = await Category.findOne({ category: categoryName });
    if (!isCategoryExist) {
      const createCategory = await Category.create({
        category: categoryName
      });
      res
        .status(200)
        .json({ message: "Category created successfully", status: true });
    } else {
      res.status(400).json({ message: "Category Already exist", status: true });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

// @desc    category find
// @route   get /api/product/categoryFind
// @access  user

export const findCategoryController = asyncHandler(async (req, res) => {
    try {
      const findCategory = await Category.find({ });
        res
          .status(200)
          .json({ message: "Category created successfully", status: true,data:findCategory });
    
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({ message: "Something went wrong", status: false });
    }
  });

// @desc    subCategory Create
// @route   post /api/product/createSubCategory
// @access  user

export const createSubCategoryController = asyncHandler(async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.body;
    const createCategory = await Category.findByIdAndUpdate(categoryId, {
      $push: { subCategory: subCategoryName }
    });
    res
      .status(200)
      .json({ message: "SubCategory created successfully", status: true });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong", status: false });
  }
});

