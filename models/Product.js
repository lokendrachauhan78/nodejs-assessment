const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    description:String,

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },

    image:{
        type:String
    }

},{timestamps:true});

module.exports = mongoose.model("Product",ProductSchema);