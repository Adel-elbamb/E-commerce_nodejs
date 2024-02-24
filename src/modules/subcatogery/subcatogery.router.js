import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as Subcatogery from './controller/subcatogery.controller.js'
// import { UpdateCatogrySchema, addCatogrySchema } from './catogrey.validation.js'
const router = Router()
router.post ('/'
 ,uploadFile({customTypes : validationTypes.image}).single('image')
 ,asyncHandler(Subcatogery.CreateSubCatogrey))
//  .get('/' , Subcatogery.allCatogery)
//  .get('/:CatogeryId' , Subcatogery.oneCatogry)
//  .patch('/:categeryId',uploadFile({customTypes : validationTypes.image}).single('image')
//  ,asyncHandler(Subcatogery.updateCatogry))
export default router 