import joi from 'joi'
import generalFields from './../../utils/genaralFields.js'



export const signupSchema = joi.object({
    email: generalFields.email,
    name: joi.string().min(3).max(20).required(),
    password: generalFields.password,
    cPassword: joi.string().valid(joi.ref('password')).required(),
    phone : joi.string().regex(/^01[0125][0-9]{8}$/).required()

}).required()




export const loginSchema = joi.object({
    email: generalFields.email,
    password: generalFields.password
}).required()

export const sendCodeSchema = joi.object({
    email: generalFields.email,
}).required()

export const forgetPasswordSchema = joi.object({
    email: generalFields.email,
    password : generalFields.password ,
    // cPassword: joi.string().valid(joi.ref('password')).required() ,
    code : joi.string().length(5).pattern(new RegExp(/^\d{5}$/))

})

