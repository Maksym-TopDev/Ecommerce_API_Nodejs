const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const SubCategory = require("../models/subCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
// Nested route
if (!req.body.category) {
  req.body.category = req.params.categoryId
    }
    next()
  }



// @desc Create subCategory
// @route POST /api/v1/subCategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({
    data: subCategory,
  });
});

// Nested route
// GET /api/v1/categories/:categoryId/subCategories

// @desc Get all subCategories by category
// @route GET /api/v1/categories/:categoryId/subCategories
// @access Public
exports.getSubCategoriesByCategory = asyncHandler(async (req, res)=>{
  const {categoryId} = req.params;
  const subCategories = await SubCategory.find({category: categoryId});
  res.status(200).json({
    data: subCategories
  })
})

// Nested route 
// GET /api/v1/categories/:categoryId/subCategories/
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObj = filterObject;
  next();
}


// @desc Get all subCategories
// @route GET /api/v1/subCategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObj).skip(skip).limit(limit)
  // .populate({path:'category', select :'name -_id'});
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc Get specific subCategory by id
// @route GET /api/v1/subCategories/:id
// @access Public

exports.getSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
    // .populate({path:'category', select :'name -_id'});

  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).json({
    data: subCategory,
  });
});

// @desc Update specific subcategory
// @route PUT /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`No Subcategory for this id ${id}`, 404));

    // res.status(404).json(
    //   {msg: 'No Category for this id ${id}'}
    // )
  }
  res.status(200).json({ data: subCategory });
}); // @desc Delete specific category
// @route DElETE /api/v1/categories/:id
// @access Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No Subcategory for this id ${id}`, 404));

    // res.status(404).json(
    //   {msg: 'No Category for this id ${id}'}
    // )
  }
  res.status(204).send();
});
