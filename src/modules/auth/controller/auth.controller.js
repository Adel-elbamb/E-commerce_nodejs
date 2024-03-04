import userModel from './../../../DB/models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {genrateToken} from './../../../utils/signAndverfiyToken.js'
import {verify} from './../../../utils/signAndverfiyToken.js'
export {hashPass} from './../../../utils/HashandCompare.js'
export {compare} from './../../../utils/HashandCompare.js'
import sendEmail from '../../../utils/sendEmail.js'
import { hashPass } from './../../../utils/HashandCompare.js'
import { customAlphabet } from 'nanoid'


//=================================signUP=================================
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
      //==================================================validation Email =========================

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
     //==================================refreshToken==========================
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
    //=============================================loign================================
    export const login = async (req,res,next) => {
         const {email , password} = req.body
         const user = await userModel.findOne({email})
         if(!user) {
            return next(new Error ("email or  valid ") , {cause : 400})
         }
         if(!user.confirmed) {
            return next(new Error ("email not confirmed  ") , {cause : 400})
         }
         const match = bcrypt.compareSync(password , user.password)
         if(!match) {
            return next(new Error ("email or password not valid ") , {cause : 400})
         }
         if(user.deleted) {
            user.deleted = false 
         }
         user.status = "online"
         await user.save()

          const token = genrateToken({payload : {email  , _id : user._id  , role : user.role } , expireIn : 60*60})
         const refreshtoken =  genrateToken({payload : {email  , _id : user._id  , role : user.role }, expireIn : 60*60*24*30}) // using when token expire 

         return res.json({message : "done" ,token  ,  refreshtoken })

         
    }
    //===============================forgetPassword =============================
   //  1-send code and  cheack for code in exist in data base
   //2- forget password 
    export const  sendCode  = async(req,res,next) => {
       const {email} = req.body 
       const user = await userModel.findOne({email})
       if(!user) {
         return next(new Error ("invalid user "), {cause : 404})
       }
       if(!user.confirmed) {
         return next(new Error ("invalid user" ) , {cause : 400})
       }
       const nanid = customAlphabet('1234567890', 5)
       const code = nanid()
       const html = `<h1>${code}</h1>` 
       if(! sendEmail({to:email , subject : "forgetPassword", html })) {
         return next(new Error (" email not exist ") , {cause : 400 })
        }
        const userUpdeted =  await  userModel.updateOne ({email}, {code : code } , {new :true }   )
        return res.status(200).json({message : "cheack your email " , userUpdeted })
    }
 

    //2- 
    export const forgetPassword = async(req,res,next) => {
      const {email , code , password } = req.body
      const user = await userModel.findOne({email})
       if(!user) {
         return next(new Error ("invalid user "), {cause : 404})
       }

       if( code != user.code ) {
         return next (new Error ("code is not valid "))
       }
        const hashPassword = hashPass(password)
       const newUser = await userModel.findOneAndUpdate({email} , {password : hashPassword , code : null , status : "offline"} , {new : true })
       return res.status(200).json({message : "done" , newUser})
    }


    
 