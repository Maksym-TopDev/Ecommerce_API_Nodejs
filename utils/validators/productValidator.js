const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");
exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short Product title")
    .isLength({ max: 3200 })
    .withMessage("Too long Product title"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 30 })
    .withMessage("Too short Product description")
    .isLength({ max: 2000 })
    .withMessage("Too long Product description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number")
    .isInt({ min: 0 })
    .withMessage("Product quantity must be greater than 0"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("Price after discount must be less than price");
      }
      return true;
    }),
  check("colors").optional().isArray().withMessage("Colors must be an array"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("images").optional().isArray().withMessage("Images must be an array"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid category id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error(`No category for this id ${categoryId}`));
        }
      })
    ),
  check("subCategorys")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory id format").custom((categoryId) =>
      SubCategory.findById({_id : {$exists: true , $in :subcategoriesIds}}).then(result => {
        console.log(result)
      })
    ),
  check("brand").optional().isMongoId().withMessage("Invalid brand id format"),
  check("retingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product retings average must be a number")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Product retings average must be between 0 and 5"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product rating quantity must be a number"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
];
