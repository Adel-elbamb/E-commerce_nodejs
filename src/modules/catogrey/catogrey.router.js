import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as VC from './catogrey.validation.js'
import subcatogeryRouter from './../subcatogery/subcatogery.router.js'
import * as catogreyCont from './controller/catogrey.controller.js'

const router = Router()
router.use('/:catogeryId/subcatogery' , subcatogeryRouter) // to use router  in subcatogery 
router.post ('/'
 ,uploadFile({customTypes : validationTypes.image}).single('image'),
 validation(VC.addCatogrySchema)
 ,asyncHandler(catogreyCont.CreateCatogrey))
 .get('/' , catogreyCont.allCatogery)
 .get('/:CatogeryId' ,validation(VC.oneCatogrySchema), catogreyCont.oneCatogry)
 .patch('/:categeryId',uploadFile({customTypes : validationTypes.image}).single('image') ,
 validation(VC.UpdateCatogrySchema)
 ,asyncHandler(catogreyCont.updateCatogry))
export default router 