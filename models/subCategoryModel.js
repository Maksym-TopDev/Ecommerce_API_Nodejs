const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // remove space
      required: [true, "Category required"],
      unque: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [ true, "SubCategory must belong to a category" ],
    },
  },
  { timestamps: true }
);

 const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategoryModel