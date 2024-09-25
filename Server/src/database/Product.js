import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  variant: {
    type: [
      {
        ram: {
          type: String
        },
        price: {
          type: String
        },
        quantity: {
          type: String
        }
      }
    ],
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    required: true
  },
  description:{
    type:String,
    required:true
  }
});

const Products = mongoose.model("Products", Schema);

export default Products;
