import joi from 'joi'
import generalFields from './../../utils/genaralFields.js'

export const addCatogrySchema = joi.object({
    name : generalFields.name ,
    image : generalFields.files,
    // sulg : generalFields.name
}).required()

export const UpdateCatogrySchema = joi.object({
    name : generalFields.name ,
    image : generalFields.files,
    // sulg : generalFields.name
}).required()