import {Router} from 'express'
import {asyncHandler} from '../../utils/asyncHandeller.js'
import {uploadFile , validationTypes } from './../../utils/cloudinryMulter.js'
import * as catogreyCont from './controller/catogrey.controller.js'
const router = Router()
router.post ('/createcatogrey'
 ,uploadFile({customTypes : validationTypes.image}).single('image')
 ,asyncHandler(catogreyCont.CreateCatogrey))
 
export default router 