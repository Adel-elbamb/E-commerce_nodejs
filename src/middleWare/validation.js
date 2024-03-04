import { Types } from 'mongoose'

export const validationId = (value, helper) => {
    return Types.ObjectId.isValid(value) ?
        true :
        helper.message('invalid format of id')
}
// if  containHeaders  equl true to cheak for  authouttion  
const validation = (schema , containHeaders = false ) => {
    return (req, res, next) => {
        const { authorization } = req.headers //data ,undefiend
        let data;
            data = { ...req.body, ...req.params, ...req.query }
        if (req.file) {  //this req.file is alone becouse validation this can check an object of data 
            data = { ...data, image: req.file }
        }
        if (req.files) {
            data = { ...data, files: req.files }
        }

        //to cheack the token when using multer 
        if (authorization && containHeaders) {
            data = {authorization}
        }
        // console.log(data);
        const validationResult = schema.validate(data , { abortEarly: false }) // 
        //{ abortEarly: false } => in validation useing if have more then error retuen all on the time
        if (validationResult.error) {
            req.validationError = validationResult.error // to send validationResult.error from golabel error to return error details for frontend 
            
            return next(new Error ("catch validation error"), {cause : 400})
        }
        next()
    }
}
export default validation