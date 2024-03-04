import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as PC from './controller/product.controller.js'
import auth from '../../middleWare/auth.js'

// import { object } from 'joi'
const router = Router()
 router.post('/' , uploadFile({customTypes : validationTypes.image}).fields([
    {
        name : "MainImage" , maxCount : 1
    } ,
    {
        name : "subImage" , maxCount : 5
    }
 ]) ,PC.addProduct)

export default router