import joi from 'joi'
import generalFields from './../../utils/genaralFields.js'

export const addBrandSchema = joi.object({
    name : generalFields.name ,
    image : generalFields.files,
    logo : generalFields.files,
    catogeryId : generalFields.id ,
    subcatogeryId : generalFields.id
    // sulg : generalFields.name
}).required()

export const UpdateBrandSchema = joi.object({
    brandId : generalFields.id ,
    name : joi.string().min(3).max(20),
    logo : generalFields.files,
    // sulg : generalFields.name
}).required()

export const oneBrandSchema = joi.object ({
    brandId : generalFields.id ,
    // authorization : generalFields.authorization
})

export const tokenSchema = joi.object({
    authorization : generalFields.authorization
})