import slugify from 'slugify'
import brandModel from './../../../DB/models/brand.model.js'
 import   cloudinary from './../../../utils/coludinery.js'

//addCatogrey
export const  Createbrand = async (req ,res ,next ) => {
    const {name } = req.body 
    const brandExist = await brandModel.findOne({name})
    if(brandExist) {
        return next(new Error (" name brand  is exist  ") , {cause : 409})
    }
    // console.log(req.file)
    const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/brand`})
     console.log({public_id , source_url})
    
    if (!public_id) {
        return next(new Error (" name catogery is exist  ") , {cause : 404})
    }
      req.body.slug = await slugify(name) // useing in search and put - between in space
    const newbrand = await brandModel.create({
        name ,
         image : {public_id , source_url} ,
         slug : name ,
    }) 
     return res.status(201).json({message : "done"  , newbrand})

}

//allbrand 
export const allBrand = async (req,res,next) => {
    const brand = await brandModel.find()
    return res.status(200).json({message : "done" , allBrand : brand })
}
// //one Brand using _id 

export const oneBrand = async (req,res,next) => {
    const {brandId} = req.params 
    const brand = await brandModel.findById({_id : brandId})
    return res.status(200).json({message : "one  brand is " , brand })
}
// // update Catogery 
// //1-if catogery exist 
// //2-if update name --> name is exist --> change slug 
// //3-if update image --> chanage image --> remove image befor 
// //4- update catory 
export const updateBrand = async (req ,res,next) => {
    // 1-
   const {brandId} = req.params 
const brand = await brandModel.findById({_id : brandId})
 if (!brand) {
    return next(new Error ("Brand not exist ") , {cause : 404})
 }
//2-
 if (req.body.name) {
    const nameExist = await brandModel.findOne({ name : req.body.name})
     if(nameExist) {
        // return res.status(409).json({message : "catogry name exist before "})
        return next (new Error ("brand name exist before " , {cause : 409}))

     }
     req.body.slug = slugify(req.body.name)
 }
//3-
 if(req.body.logo) {
    const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/brand`})
    // console.log({public_id , source_url})
   if (!public_id) {
    return next(new Error ("image not upload "))

   }
   console.log(brand.logo.public_id)
    const deleteimage = await coludinery.uploader.destroy({public_id : brand.logo.public_id})
 }

//  4- 
const updateBrand = await brandModel.findOneAndUpdate({_id : brandId} , req.body ,{new : true })
return res.status(200).json({message : "done" , updateBrand })
}

