import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as BC from './controller/brand.controller.js'
import * as Bv from './brand.validation.js'

const router = Router()
  // mergeParams to get url from catogery/catogeryId/subcatogery

router.post ('/'
 ,uploadFile({customTypes : validationTypes.image }).single('image')
 ,validation(Bv.addBrandSchema)
 ,asyncHandler(BC.Createbrand))
 .get('/' , BC.allBrand)
 .get('/:brandId' ,validation(Bv.oneBrandSchema), BC.oneBrand)
 .patch('/:brandId',uploadFile({customTypes : validationTypes.image}).single('logo')
 ,validation(Bv.UpdateBrandSchema)
 ,asyncHandler(BC.updateBrand))
export default router 