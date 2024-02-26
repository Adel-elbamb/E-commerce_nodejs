import joi from "joi"
import { validationId } from "../middleware/validation.js"

const generalFields = {
    email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    name : joi.string().min(3).max(20).required() ,
    id: joi.custom(validationId).required(), //custom using to cheack a validation  from   validation    middleware 
    authorization: joi.string().required() ,
     // multer files 
    files: (joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),
        finalDest: joi.string()
    }))
}
export default generalFields