const {check}  = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid subCategory id format')
    , 
    validatorMiddleware
]


exports.createSubCategoryValidator = [
    check('name').notEmpty().withMessage('SubCategory name is required')
    .isLength({min: 3}).withMessage('Too short subCategory name')
    .isLength({max: 32}).withMessage('Too long subCategory name'),

    check('category').notEmpty().withMessage('SubCategory must be belong to a category')
    .isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
]


exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format')
    ,
    validatorMiddleware
]
exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format')
    ,
    validatorMiddleware
]
