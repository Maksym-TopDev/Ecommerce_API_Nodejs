const mongoose = require("mongoose");
const productschema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Product Title is required"],
      minlength: [3, "Too short title"],
      maxlength: [3200, "Too long title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
      minlength: [30, "Too short description"],
      maxlength: [2000, "Too long description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
      min: [0, "Quantity must be greater than 0"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      // trim: true,
      // maxlength: [20, "Too long price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product Image Cover is required"],
    },
    images: [String], // that's an array of strings
    category: {
      type: mongoose.Schema.ObjectId, // that's an object id
      ref: "Category", // that's a reference to the category model
      required: [true, "Product must belong to a category"],
    },
    subCategorys: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
    },
    retingsAverage:{
        type: Number,
        default: 4.5,
        // min and max used for number
        // minlenght and maxlength used for string
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],

    },
    ratingsQuantity:{
        type: Number,
        default: 0,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Product", productschema);
