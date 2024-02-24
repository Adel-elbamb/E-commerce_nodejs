import slugify from 'slugify'
import SubCatogeryModel from './../../../DB/models/subcarogery.model.js'
import catogreyModel from './../../../DB/models/categry.model.js'
 import   cloudinary from './../../../utils/coludinery.js'
// import coludinery from './../../../utils/coludinery.js'

//addsubCatogrey
export const  CreateSubCatogrey = async (req ,res ,next ) => {
    const {catogeryId} = req.params
    const  categery =  await catogreyModel.findById({ _id :catogeryId})
    if(!categery) {
        return next(new Error ("catogery not found " , {cause : 404}))
    }
    const {name } = req.body 
    const SubcatogreyExist = await SubCatogeryModel.findOne({name})
    if(SubcatogreyExist) {
        return next(new Error (" name catogery is exist  ") , {cause : 409})
    }
     console.log(req.file)
    const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/catogrey/${catogeryId}/SubCatogery`})
    //  console.log({public_id , source_url})
     
    if (!public_id) {
        return next(new Error ("name catogery is exist") , {cause : 404})
    }
    
      req.body.slug = await slugify(name) // useing in search and put - between in space
      req.body.catogeryId = catogeryId
    const newSubCatogrey = await SubCatogeryModel.create({
        name ,
         image : {public_id , source_url} ,
         slug : name ,
         catogeryId 


    }) 
     return res.status(201).json({message : "done"  , newSubCatogrey})

}

//allsubCatogrey 
export const allSubCatogery = async (req,res,next) => {
    const categeryId = req.params
    console.log(categeryId)
    const allSubCatogery = await SubCatogeryModel.find({categeryId : categeryId})
    return res.status(200).json({message : "done" ,  allSubCatogery})
}
// //one subCatogry using _id 

export const oneSubcatogry = async (req,res,next) => {
    const {subId} = req.params 
    const SubCatogery = await SubCatogeryModel.findById({_id : subId})
    return res.status(200).json({message : "one catogrey is " ,SubCatogery  })
}
// // update Catogery 
// //1-if catogery exist 
// //2-if update name --> name is exist --> change slug 
// //3-if update image --> chanage image --> remove image befor 
// //4- update catory 
export const updateCatogry = async (req ,res,next) => {
    // 1-
   const {subId} = req.params
const  subcarogery = await SubCatogeryModel.findById({ _id : subId})
 if (!subcarogery) {
    return next(new Error ("catogry not exist ") , {cause : 404})
 }


//2-
 if (req.body.name) {
    const nameExist = await SubCatogeryModel.findOne({ name : req.body.name})
     if(nameExist) {
        // return res.status(409).json({message : "catogry name exist before "})
        return next (new Error ("Subcatogry name exist before " , {cause : 409}))

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
const updateSubCatogry = await SubCatogeryModel.findOneAndUpdate({_id : subId} , req.body ,{new : true })
return res.status(200).json({message : "done" ,  updateSubCatogry })
}

