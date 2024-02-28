import userModel from './../../../DB/models/user.model.js'

import {genrateToken} from './../../../utils/signAndverfiyToken.js'
import {verify} from './../../../utils/signAndverfiyToken.js'
export {hashPass} from './../../../utils/HashandCompare.js'
export {compare} from './../../../utils/HashandCompare.js'
import sendEmail from '../../../utils/sendEmail.js'
import { hashPass } from './../../../utils/HashandCompare.js'
// import { compare } from 'bcryptjs'
import pkg from 'bcryptjs'

//signUp 
//1- cheack email exist 
//2-token and refreshToken 
//3-hashPassword  
//4- create user 

export const signUp =  
    async(req ,res, next) => {
        const {email , password } = req.body 
        const emailExist = await userModel.findOne({email})
        if(emailExist) {
         return next(new Error ("email exist before " , {cause : 409}))
        }
        const token = genrateToken({payload : {email} ,  Signture : process.env.EmailSIGNTUER , expireIn : 60*60*24} )
        const refreshToken = genrateToken ({payload  : {email} , Signture : process.env.EmailSIGNTUER , expireIn :  60*60*24})
        const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/:${token}`
        const refreshLink  = `${req.protocol}://${req.headers.host}/auth/refreshToken/${refreshToken}`

        const html = `
        <a href = ${link} style = "color : red" >confirmEmail <a> 
        <br> 
        <br> 
        <a href = ${refreshLink} style = "color : red" >send new email<a> 

        `
       if(! sendEmail({to:email , subject : "confirem Email" , html})) {
        return next(new Error ("email not exist ") , {cause : 400 })
       }
       const hashPassword  = hashPass(password)
       req.body.password = hashPassword 
       const user = await userModel.create(req.body)
       return res.status(200).json({message : "done " , user  })

    }
      //1- get token 
      //2- verify token 
      //3 - cheack email 
      //4- update confirem email and send for user login page 

    export const confiremEmail = async(req,res ,next) => {
        const {token} = req.params
        
        const {email} =   verify({token , Signture :  process.env.EmailSIGNTUER } )
         const user = await userModel.findOne({email})
         if(!user) {
            return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/") //sigup
         }
         if(user.confirmed) {
            return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/") //cofirm = true //login 

         }
         await userModel.updateOne({email} , {confirmed : true} , {new : true })
         return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/") //update and login 

    }

    export const refreshToken = async (req ,res , next) => {
        const {token} = req.params
        const {email} =   verify({token , Signture :  process.env.EmailSIGNTUER } )
         const user = await userModel.findOne({email})
         if(!user) {
            return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/") //sigup
         }
         if(user.confirmed) {
            return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/") //cofirm = true //login 

         }
         const newToken = genrateToken({payload : {email} ,  Signture : process.env.EmailSIGNTUER , expireIn : 60*60*24} )
         const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/:${newToken}`
         const html = `
        <a href = ${link} style = "color : red" >confirmEmail <a> `
       if(! sendEmail({to:email , subject : "confirem Email" , html})) {
        return next(new Error ("email not exist ") , {cause : 400 })
       }
       return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/")

    }

    export const login = async (req,res,next) => {
         const {email , password} = req.body
         const userExist = await userModel.findOne({email})
         if(!userExist) {
            return next(new Error ("email or  valid ") , {cause : 400})
         }
         // if(!userExist.confirmed) {
         //    return next(new Error ("email or password not valid ") , {cause : 400})
         // }
         const match = compare({plainText : password , hashValeau : userExist.password})
         if(!match) {
            return next(new Error ("email or password not valid ") , {cause : 400})
         }
         if(userExist.deleted) {
            userExist.deleted = false 
         }
         userExist.status = "online"
         await userExist.save()


         const token = genrateToken({payload : {email , _id  , role } , Signture : process.env.EmailSIGNTUER , expireIn : 60*60})
         const refreshtoken = genrateToken({payload : {email , _id  , role } , Signture : process.env.EmailSIGNTUER , expireIn : 60*60*24*30}) // using when token expire 

         return res.json({message : "done" , token , refreshToken })

         
    }
    
