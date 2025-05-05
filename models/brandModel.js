const mongoose = require('mongoose');
// 1-  Create a schema 
const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String ,
            trim : true,
            required : [true , `Brand name is required`],
            unique: [true , `Brand name must be unique`],
            minlength : [3 , `Too short brand name `],
            maxlength : [32 , `Too long brand name`]
        },
        slug: {
            type: String , 
            lowercase : true,
        },
        image : String
},{timestamps : true})


// 2- Create a model
module.exports = mongoose.model('Brand' , brandSchema)
