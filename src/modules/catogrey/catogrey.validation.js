import joi from 'joi'
import generalFields from './../../utils/genaralFields.js'

export const addCatogrySchema = joi.object({
    name : generalFields.name ,
    image : generalFields.files.required(),
    // sulg : generalFields.name
}).required()

export const UpdateCatogrySchema = joi.object({
    categeryId : generalFields.id ,
    name : joi.string().min(3).max(20),
    image : generalFields.files,
    // sulg : generalFields.name
}).required()

export const oneCatogrySchema = joi.object ({
    CatogeryId : generalFields.id ,
     authorization : generalFields.authorization
})

export const tokenSchema = joi.object({
    authorization : generalFields.authorization
})