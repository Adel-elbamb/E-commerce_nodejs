import Router from 'express'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import {asyncHandler} from './../../utils/asyncHandeller.js'
import * as CC from './controller/coupon.controller.js'
import * as CV from './coupon.validation.js'
const router = Router()

router.post('/' ,
uploadFile({customTypes : validationTypes.image}).single('image'),
validation(CV.addCouponSchema) ,
asyncHandler( CC.CreateCoupon))
.get('/' , asyncHandler(CC.allCoupon))
.get('/:CouponId' , validation(CV.oneCouponSchema),CC.oneCoupon)
.put('/:CouponId' ,
uploadFile({customTypes : validationTypes.image}).single('image'),
validation(CV.UpdateCouponSchema) ,
 asyncHandler(CC.updateCoupon))

export default router 

