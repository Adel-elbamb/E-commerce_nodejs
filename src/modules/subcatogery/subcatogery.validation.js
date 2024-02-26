import joi from 'joi'
import generalFields from './../../utils/genaralFields.js'

export const addSubcatogerySchema = joi.object({
    name : generalFields.name ,
    image : generalFields.files.required(),
    catogeryId : generalFields.id
    // sulg : generalFields.name
}).required()

export const UpdateSubcatogerySchema = joi.object({
    name : joi.string().min(3).max(20),
    image : generalFields.files,
    subId : generalFields.id,
    catogeryId : generalFields.id

    // sulg : generalFields.name
}).required()

export const oneSubcatogrySchema = joi.object ({
    subId : generalFields.id ,
    catogeryId : generalFields.id

    // authorization : generalFields.authorization
})