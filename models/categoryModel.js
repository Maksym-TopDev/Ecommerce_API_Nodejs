const mongoose = require("mongoose");
// 1- create a schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category required"],
        unque: [true, "Category must be unique"],
        minlength: [3, "Too short category name"],
        maxlength: [32, "Too long category name"],
    },
    // A and B  => shoping.com/a-and-b
    slug: {
        type: String,
        lowercase: true,
    }
},{timestamps: true});
// 2- create a model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel