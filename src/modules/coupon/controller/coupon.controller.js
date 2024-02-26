import couponModel from "../../../DB/models/coupon.model.js";
 import   cloudinary from './../../../utils/coludinery.js'

//addcoupon
export const  CreateCoupon= async (req ,res ,next ) => {
    const {name } = req.body 
    const catogreyExist = await couponModel.findOne({name})
    if(catogreyExist) {
        return next(new Error (" name catogery is exist  ") , {cause : 409})
    }
    // console.log(req.file)
    let {image} = req.body
    const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : '/coupon'})
     console.log({public_id , source_url})
    
    if (!public_id) {
        return next(new Error (" name catogery is exist  ") , {cause : 404})
    }
      image  = {public_id , source_url} 
    const  newCoupon= await    couponModel.create(req.body) 
     return res.status(201).json({message : "done"  , newCoupon})

}

// allCoupon
export const allCoupon = async (req,res,next) => {
    const  coupon = await couponModel.find()
    return res.status(200).json({message : "done" , allcoupon: coupon })
}
//one Catogry using _id 

export const oneCoupon = async (req,res,next) => {
    const {CouponId} = req.params 
    const coupon = await couponModel.findById({_id : CouponId})
    return res.status(200).json({message : "one coupon " , coupon })
}
// update Catogery 
//1-if catogery exist 
//2-if update name --> name is exist --> change slug 
//3-if update image --> chanage image --> remove image befor 
//4- update catory 
export const updateCoupon = async (req ,res,next) => {
    // 1-
   const {CouponId} = req.params 
  const Coupon= await couponModel.findById({_id : CouponId})
 if (!Coupon) {
    return next(new Error ("Coupon not exist ") , {cause : 404})

 }
//2-
 if (req.body.name) {
    const nameExist = await couponModel.findOne({ name : req.body.name})
     if(nameExist) {
        // return res.status(409).json({message : "catogry name exist before "})
        return next (new Error ("Coupon name exist before " , {cause : 409}))
     }
 }
//3-
 if(req.body.image) {
    const {public_id , source_url} =  await cloudinary.uploader.upload(req.file.path ,{folder : `/coupon`})
    // console.log({public_id , source_url})
   if (!public_id) {
    return next(new Error ("image not upload "))

   }
//    console.log(catogrey.image.public_id)
       await coludinery.uploader.destroy({public_id : Coupon.image.public_id})
 }

// 4
const updateCoupon = await couponModel.findOneAndUpdate({_id : CouponId} , req.body ,{new : true })
return res.status(200).json({message : "done" , updateCoupon })
}

