import SupCatogeryModel from './../../../DB/models/supcarogery.model.js'
import   cloudinary from './../../../utils/coludinery.js'
import slugify from 'slugify'

//addCatogrey
export const  CreateSupCatogrey = async (req ,res ,next ) => {
    const {catogeryId} = req.params 
     const categeryExist =  await SupCatogeryModel.findById({_id : catogeryId})
     if(categeryExist) {
        return res.status(409).json({message : " name catogery is exist  "})
        }
    const {name } = req.body 
    const SupcatogreyExist = await SupCatogeryModel.findOne({name})
    if(SupcatogreyExist) {
    return res.status(409).json({message : " name catogery is exist  "})
    }
    // console.log(req.file)
    const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/catogrey/SupCarogery`})
     console.log({public_id , source_url})
    
    if (!public_id) {
        return res.json({message : "image not upload "})
    }
      req.body.slug = await slugify(name) // useing in search and put - between in space
    const newSupCatogrey = await SupCatogeryModel.create({
        name ,
         image : {public_id , source_url} ,
         slug : name 
    }) 
     return res.status(201).json({message : "done"  , newSupCatogrey})

}

//allCatogrey 
// export const allCatogery = async (req,res,next) => {
//     const catogery = await SupCatogeryModel.find()
//     return res.status(200).json({message : "done" , allCatogery : catogery })
// }
//one Catogry using _id 

// export const oneCatogry = async (req,res,next) => {
//     const {CatogeryId} = req.params 
//     const categery = await catogreyModel.findById({_id : CatogeryId})
//     return res.status(200).json({message : "one catogrey is " , categery })
// }
// update Catogery 
//1-if catogery exist 
//2-if update name --> name is exist --> change slug 
//3-if update image --> chanage image --> remove image befor 
//4- update catory 
// export const updateCatogry = async (req ,res,next) => {
//     // 1-
//    const {categeryId} = req.params 
// const catogrey = await catogreyModel.findById({_id : categeryId})
//  if (!catogrey) {
//     return res.status(404).json({message : "catogry not exist "})
//  }
// //2-
//  if (req.body.name) {
//     const nameExist = await catogreyModel.findOne({ name : req.body.name})
//      if(nameExist) {
//         // return res.status(409).json({message : "catogry name exist before "})
//         return next (new Error ("catogry name exist before " , {cause : 409}))

//      }
//      req.body.slug = slugify(req.body.name)
//  }
// //3-
//  if(req.body.image) {
//     const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/catogrey`})
//     // console.log({public_id , source_url})
//    if (!public_id) {
//        return res.json({message : "image not upload "})
//    }
//    console.log(catogrey.image.public_id)
// //    const deleteimage = await coludinery.uploader.destroy({public_id : catogrey.image.public_id})
//  }

// //  4- 
// const updateCatogry = await catogreyModel.findOneAndUpdate({_id : categeryId} , req.body ,{new : true })
// return res.json({message : "done" , updateCatogry })
// }

