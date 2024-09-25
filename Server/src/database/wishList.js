import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registratedUser',
    required: true,
  },

  
});

const Wishlist = mongoose.model("wishlist", Schema);

export default Wishlist;
