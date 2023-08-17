const { User } = require("../Model/model");
const route = require("../route/Router");
const joi = require("@hapi/joi");
const {couponSchema} = require('../Validation/validate');
const dotenv = require("dotenv");
dotenv.config();
const { sendEmail } = require('../NodeMailer/nodemailer');




const createCoupon = async(req,res)=>{
    try{
        const validationResult = couponSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details[0].message });
        }

        const existingCoupon = await User.findOne({offerName: req.body.offerName});
        if (existingCoupon) return res.status(200).json({message:"Coupon already exists"})


        const couponData = new User({
            offerName: req.body.offerName,
            couponCode: req.body.couponCode,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            discountPercentage: req.body.discountPercentage,
            discountAmount: req.body.discountAmount,
            termsAndCondition: req.body.termsAndCondition,
            status: req.body.status,
            mail:req.body.mail  
        });
        console.log(couponData)
        await couponData.save();
        if (couponData.mail) {
            const createdData = ({data:couponData})
            sendEmail(couponData.mail, createdData);
        }

        res.status(200).send(`Coupon created Successfully \n Created Id = ${couponData._id},`) 
        }
        catch(error){
            return res.status(500).send({message:"Server Error..."})
        };
} 


const couponUpdate = async(req,res)=>{
    try{
        const couponId = req.params.id;
        const couponUpdate = req.body;
        const validationResult = couponSchema.validate(couponUpdate);
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details[0].message });
        }

        const updatedCouponData = await User.findByIdAndUpdate(couponId, {$set:couponUpdate},{new:true});
        if (!updatedCouponData){
            return res.status(404).json({message:"Coupon Not Found"})
        }
        updatedCouponData.status = "Updated";
        res.json({message:"Updated", data : updatedCouponData})

    }catch(Err){
        
        return res.status(500).send({message:"Server Error"})

    }
}

const couponDelete = async(req,res)=>{
    try{
        const couponId = req.params.id;
        const updatedCouponData = await User.findByIdAndDelete(couponId);
        if (!updatedCouponData){
            return res.status(404).json({message:"Coupon Not Found"})
        }
        res.json({message:"Deleted", data : updatedCouponData})

    }catch(Err){
        
        return res.status(500).send({message:"Server Error"})

    }
}


const couponGet = async(req,res)=>{
    try{
        const couponId = req.params.id;
        const findCoupon = await User.findById(couponId);
        if (!findCoupon){
            return res.status(404).send({message:"Coupon Not Found"})
        }
        res.json({data: findCoupon});

    }catch(Err){
        return res.status(500).send({message:"Server Error"})
    }
}


const couponGetAll = async(req,res)=>{
    try{
        const findCoupon = await User.find().sort({_id : 1});
        res.json({data: findCoupon});
    }catch(Err){
        return res.status(500).send({message:"Server Error"})
    }
}

const couponValid = async(req,res)=>{
    try{
        const checkCoupon = await User.findOne({offerName:req.body.offerName})
        const currentDate = new Date();
        const startDate = new Date(checkCoupon.startDate);
        const endDate = new Date(checkCoupon.endDate);
        if (currentDate<startDate && currentDate<=endDate){
            return res.status(200).send({message:"Coupon not Activated"})
        }if(currentDate>=startDate && currentDate<=endDate){
            return res.status(200).send({message:"Coupon is valid"})
        }else{
            return res.status(200).send({message:"Coupon has Expired"})
        }
    }catch(error){
        return res.status(500).send({message:"Server Error"})
    }
}
 
module.exports={
   createCoupon,
   couponUpdate,
   couponDelete,
   couponGet,
   couponGetAll,
   couponValid
}