import Router from 'express'
import validation from '../../middleware/validation.js'
import * as authC from './controller/auth.controller.js'
import * as authV from './auth.valiadtion.js'
import {asyncHandler} from './../../utils/asyncHandeller.js'
const router = Router()
router.post
('/signup' , 
validation(authV.signupSchema) ,
asyncHandler(authC.signUp)
)
.get(
    '/confirmEmail/:token'  
,asyncHandler(authC.confiremEmail)
)
.get(
    '/refreshToken/:token' 
    , asyncHandler(authC.refreshToken)
    ) 
.post('/login' ,
 validation(authV.loginSchema)
 ,asyncHandler(authC.login)
 )
 .patch(
    '/'
    ,validation(authV.sendCodeSchema)
    ,authC.sendCode
    )
.put(
    '/' ,
    validation(authV.forgetPasswordSchema) ,
    asyncHandler(authC.forgetPassword)
)
 
export default router 