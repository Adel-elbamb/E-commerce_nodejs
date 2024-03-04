import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as VC from './catogrey.validation.js'
import subcatogeryRouter from './../subcatogery/subcatogery.router.js'
import * as catogreyCont from './controller/catogrey.controller.js'
import auth from '../../middleWare/auth.js'
import Role  from '../../utils/systemRoles.js'
import categeryEndPoints from './catogery.endPoint.js'
// import { object } from 'joi'
const router = Router()
router.use('/:catogeryId/subcatogery' , subcatogeryRouter) // to use router  in subcatogery 
router.post (
    '/',
validation(VC.tokenSchema , true)
 , auth( categeryEndPoints.create )  //Object.keys(Role) => using to select all roles 
 ,uploadFile({customTypes : validationTypes.image}).single('image'),
 validation(VC.addCatogrySchema)
 ,asyncHandler(catogreyCont.CreateCatogrey))
 .get(
    '/' 
    , validation(VC.tokenSchema )
    , auth(Object.keys(Role)) 
    ,catogreyCont.allCatogery
    )
 .get(
    '/:CatogeryId' ,validation(VC.oneCatogrySchema),auth(Object.keys(Role)), catogreyCont.oneCatogry)
 .patch('/:categeryId',uploadFile({customTypes : validationTypes.image}).single('image') ,
 validation(VC.UpdateCatogrySchema)
 ,asyncHandler(catogreyCont.updateCatogry))
export default router 