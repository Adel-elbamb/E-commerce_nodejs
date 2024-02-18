import slugify from 'slugify'
import catogreyModel from './../../../DB/models/categry.model.js'
 import   cloudinary from './../../../utils/coludinery.js'
 import path from "path"

export const  CreateCatogrey = async (req ,res ,next ) => {
    const {name } = req.body 
    const catogreyExist = await catogreyModel.findOne({name})
    if(catogreyExist) {
    return res.stutus(409).json({message : "catogrey not found "})
    }
    // console.log(req.file)
    const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/catogrey`})
     console.log({public_id , source_url})
    

    if (!public_id) {
        return res.json({message : "image not upload "})
    }
    // const slug = await slugify(name) // useing in search and put - between in space
    const newCatogrey = await catogreyModel.create({
        name ,
        image : {public_id , source_url} ,
         
    }) 
     return res.status(201).json({message : "done"  , newCatogrey})

}