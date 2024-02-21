import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as SubCatogery from './controller/catogrey.controller.js'
const router = Router()
router.post ('/'
 ,uploadFile({customTypes : validationTypes.image}).single('image')
 ,asyncHandler(SubCatogrey.CreatesupCatogrey))
 
//  .get('/' , b.allCatogery)
//  .get('/:CatogeryId' , b.oneCatogry)
//  .patch('/:categeryId',uploadFile({customTypes : validationTypes.image}).single('image'),
//  asyncHandler(b.updateCatogry))
// export default router 