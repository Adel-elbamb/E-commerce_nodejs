import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as Subcatogery from './controller/subcatogery.controller.js'
import * as VSC from './subcatogery.validation.js'
// import { UpdateCatogrySchema, addCatogrySchema } from './catogrey.validation.js'
const router = Router({mergeParams : true })   // mergeParams to get url from catogery/catogeryId/subcatogery

router.post ('/'
 ,uploadFile({customTypes : validationTypes.image }).single('image')
 ,validation(VSC.addSubcatogerySchema)
 ,asyncHandler(Subcatogery.CreateSubCatogrey))
 .get('/' , Subcatogery.allSubCatogery)
 .get('/:subId' ,validation(VSC.oneSubcatogrySchema), Subcatogery.oneSubcatogry)
 .patch('/:subId',uploadFile({customTypes : validationTypes.image}).single('image')
 ,validation(VSC.UpdateSubcatogerySchema)
 ,asyncHandler(Subcatogery.updateCatogry))
export default router 