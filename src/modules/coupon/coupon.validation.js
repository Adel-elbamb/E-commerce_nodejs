import joi from 'joi'
import generalFields from './../../utils/genaralFields.js'

export const addCouponSchema = joi.object({
    name : generalFields.name ,
    image : generalFields.files.required(),
    Amout : joi.number().min(0).max(10).required() ,
    expireIn : joi.date().required() ,
    userId : generalFields.id
}).required()

export const UpdateCouponSchema = joi.object({
    CouponId : generalFields.id ,
    name : joi.string().min(3).max(20),
    image : generalFields.files,
    Amout : joi.number().min(0).max(10),
    expireIn : joi.date(),
   
}).required()

export const oneCouponSchema = joi.object ({
    CouponId : generalFields.id ,
    // authorization : generalFields.authorization
}).required()