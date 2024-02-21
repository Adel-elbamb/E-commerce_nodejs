import joi from "joi"
import { validationId } from "../middleware/validation.js"

const generalFields = {
    email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    id: joi.custom(validationId).required(),
    authorization: joi.string().required() ,
     // multer files 
    files: joi.array().items(joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),
        finalDest: joi.string().required()
    }).required()).required()
}
export default generalFields