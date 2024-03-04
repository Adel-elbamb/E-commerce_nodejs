
import mongoose , {Schema , model , Types } from "mongoose";

const couponSchema =   new Schema ({
  name : {
    type : String ,
    required : [true , "name is required "],
    unique : [true , "name is  unique "],
    trim : true ,
    lowercase : true 
    
  },
  Amout : {
    type : Number ,
    required : [true , "Amout is  required "],
    min : [3 ,"min of coupon 3"]  ,
    max : [20 ,"max of coupon 20"] 
  } , 
  image : {
    type : Object ,
    required : [false, " image is   required " ]
  } , 
  createdBy :  {
    type : Types.ObjectId ,
    required : [true , "user id is  required "] ,
    ref : "User"
   } ,
   updatedBy : {
    type : Types.ObjectId ,
    ref : "User"
   } ,
   usedBy :  {
    type : Types.ObjectId ,
    ref : "User"
   } ,
   expireIn : {
    type : Date
   },
    isDeleted  : {
        type : Boolean ,
        default : false 
    }
} , {
  timestamps : true ,
 })
 



const couponModel =  mongoose.model.Coupon|| model ("Coupon" , couponSchema  )

export default  couponModel