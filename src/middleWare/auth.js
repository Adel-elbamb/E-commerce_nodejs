import jwt from 'jsonwebtoken'
import userModel from "./../DB/models/user.model.js";
import { asyncHandler } from './../utils/asyncHandeller.js';
const auth = (role) => {
    return  async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization) {
            return next(new Error('please login') , {cause : 400})
        }
        const token = authorization.split(process.env.BEARER_KEY)[1]
        if (!token) {
            return next(new Error('invalid bearer key'))
        }
        const payload = jwt.verify(token, process.env.TOKEN_SIGNETURE)
        if (!payload?._id) {
            return next(new Error('invalid payload') , {cause : 400}) 
        }
        const user = await userModel.findById({ _id: payload._id }).select('email role ')
        if (!user) {
            return next(new Error('invalid id') , {cause : 404})
        }
        if(user.status == "offline ")  {
            return next (new Error ("plese login " ) , {cause : 400})
        }
         console.log(role)
        if(!role.includes(user.role)) {
            return next(new Error ("dont have a acess ") , {cause : 401})
        }
        req.user = user
        next()
    }
}
export default auth