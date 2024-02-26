import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as BC from './controller/brand.controller.js'
import * as Bv from './brand.validation.js'

const router = Router()
  // mergeParams to get url from catogery/catogeryId/subcatogery

router.post ('/'
 ,uploadFile({customTypes : validationTypes.image }).single('logo')
 ,asyncHandler(BC.Createbrand))
//  .get('/' , Subcatogery.allSubCatogery)
//  .get('/:subId' ,validation(VSC.oneSubcatogrySchema), Subcatogery.oneSubcatogry)
//  .patch('/:subId',uploadFile({customTypes : validationTypes.image}).single('image')
//  ,validation(VSC.UpdateSubcatogerySchema)
//  ,asyncHandler(Subcatogery.updateCatogry))
export default router 