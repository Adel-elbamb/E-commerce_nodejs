import ProductModel from './../../../DB/models/product.model.js'
import brandModel from './../../../DB/models/brand.model.js'
import   cloudinary from './../../../utils/coludinery.js'
import generateUniqueString from './../../../utils/genrateUniqeString.js'
//================================= Add product API =================================//
 
export const addProduct = async(req ,res, next ) => {
   // data from the request body
   const { title, desc, basePrice, discount, stock, specs } = req.body
   // data from the request query
   const { catogeryId, subcatogeryId, brandId } = req.query
   // data from the request authUser
   const addedBy = req.user._id
  //cheekbrand
   const brand = await Brand.findById(brandId)
   if (!brand) return next({ cause: 404, message: 'Brand not found' })

   // category check
   if (brand.catogeryId.toString() !== catogeryId) return next({ cause: 400, message: 'Brand not found in this category' })
   // sub-category check
   if (brand.subcatogeryId.toString() !== subcatogeryId) return next({ cause: 400, message: 'Brand not found in this sub-category' })

   const slug = slugify(title, { lower: true, replacement: '-' })  //  lowercase: true
   //totalprice 
   const appliedPrice = basePrice - (basePrice * (discount || 0) / 100)

   // upload image 
    
   const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : '/categrey'})
     console.log({public_id , source_url})
    
    if (!public_id) {
        return next(new Error (" name catogery is exist  ") , {cause : 404})
    }


}