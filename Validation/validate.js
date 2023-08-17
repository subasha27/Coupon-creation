const joi = require("@hapi/joi").extend(require('@joi/date'));



const couponSchema = joi.object({
    offerName: joi.string().required().min(3).max(20),
    couponCode:joi.string().min(6).max(10).required(),
    startDate:joi.date().format('YYYY-MM-DD').required(),
    endDate:joi.date().format('YYYY-MM-DD').required(),
    discountPercentage:joi.number(),
    discountAmount:joi.number(),
    termsAndCondition:joi.string().min(10),
    status:joi.string(),
    mail:joi.string().email() 
})


module.exports={
    couponSchema,
}