import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: [String],
    required: true
  }
});

const Category = mongoose.model("category", Schema);

export default Category;
