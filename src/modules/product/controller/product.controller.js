import ProductModel from './../../../DB/models/product.model.js'
import brandModel from './../../../DB/models/brand.model.js'
import catogeryModel from './../../../DB/models/categry.model.js'
import SubCatogeryModel from './../../../DB/models/subcarogery.model.js'
import   cloudinary from './../../../utils/coludinery.js'
import generateUniqueString from './../../../utils/genrateUniqeString.js'
import productModel from './../../../DB/models/product.model.js'
import slugify from 'slugify'
//================================= Add product API =================================//
 
export const addProduct = async(req ,res, next ) => {
    const {catogeryId , brandId , subcarogeryId } = req.body 
     const catogery = await catogeryModel.findOne ({_id : catogeryId , isDeleted : false })
     if (!catogery) {
        return next(new Error ("not found catogery "))
     }

    //  const subcatogery = await SubCatogeryModel.findOne ({_id : subcarogeryId , isDeleted : false })
    //  if (!subcatogery) {
    //     return next(new Error ("not found Subcatogery "))
    //  }

     const brand = await brandModel.findOne ({_id : brandId , isDeleted : false })
     if (!brand ) {
        return next(new Error ("not found brand  "))
     }
     const {name} = req.body 
    //  req.body.slug =  await slugify (name) 

     // price 
      let {totalPrice , price , discount } = req.body
     totalPrice =  price -((price * discount || 0 ) /100)
     //image 
     const {public_id , source_url} =  await cloudinary.uploader.upload(req.files.mainImage[0].path ,{folder : `/product `})
     console.log({public_id , source_url})
    
    if (!public_id) {
        return next(new Error (" name catogery is exist  ") , {cause : 404})
    } 
    const product = await productModel.create(req.body)

      return res.json ({message : "done " , product})

}


export const allProduct = async (req,res,next) => {
    const allProduct = await ProductModel.find()
    return res.status(200).json({message : "done" ,allProduct })
}

export const oneProduct = async (req,res,next) => {
    const {productId} = req.params 
    const product = await catogreyModel.findById({_id : productId})
    return res.status(200).json({message : "one catogrey is " , product })
}



    export const updateCatogry = async (req ,res,next) => {
        // 1-
       const {ProductId} = req.params
    const  subcarogery = await productModel.findById({ _id : ProductId})
     if (!subcarogery) {
        return next(new Error ("catogry not exist ") , {cause : 404})
     }
    
    
    //2-
     if (req.body.name) {
        const nameExist = await productModel.findOne({ name : req.body.name})
         if(nameExist) {
            // return res.status(409).json({message : "catogry name exist before "})
            return next (new Error ("Product name exist before " , {cause : 409}))
    
         }
         req.body.slug = slugify(req.body.name)
     }
    //3-
    console.log(req.file)
     if(req.body.image) {
        const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/catogrey/${req.params.categeryId}/SubCatogery`})
       if (!public_id) {
        return next(new Error ("image not upload "))
       }
        const deleteimage = await coludinery.uploader.destroy({public_id : subcarogery.image.public_id})
     }
    
    //  4- 
    const updateSubCatogry = await productModel.findOneAndUpdate({_id : subId} , req.body ,{new : true })
    return res.status(200).json({message : "done" ,  updateSubCatogry })
    }
