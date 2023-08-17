const joi = require("@hapi/joi");
const mongoose = require("mongoose");


const modelSchema = new mongoose.Schema({
    offerName:{
        type:String,
        required:true
    },
    couponCode:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true,
        get: (value) => value.toLocaleDateString(),
        set: (value) => new Date(value),
    },
    endDate:{
        type:Date,
        required:true,
        get: (value) => value.toLocaleDateString(),
        set: (value) => new Date(value),
    },
    discountPercentage:{
        type:Number,
    },
    discountAmount:{
        type:Number
    },
    termsAndCondition:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    }
   }, 
   {
    timestamps : true
    },
)

const User = mongoose.model('User',modelSchema);

module.exports={
    User,
}