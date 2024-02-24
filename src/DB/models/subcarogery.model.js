// import { object } from "joi";
import mongoose , {Schema , model , Types } from "mongoose";

const supcatagrySchema =   new Schema ({
  name : {
    type : String ,
    required : [true , "name is not required "],
    unique : [true , "name is not unique "],
    trim : true ,
    lowercase : true
    
  },
  slug : {
    type : String ,
    required : [true , "slug is  required "],
    unique : [true , "slug is not unique "],
    trim : true ,
    lowercase : true 
  } , 
  image : {
    type : Object ,
    required : [true , " image is  not required " ]
  } ,
   userId :  {
    type : Types.ObjectId ,
    required : [false , "user id is not required "] ,
    ref : "User"
   } ,
    isDeleted  : {
        type : Boolean ,
        default : false 
    } ,
    catogeryId : {
        type : Types.ObjectId ,
        required : true ,
        ref : "Catogery"
    }
} , {timestamps : true })


const SubCatogeryModel =  mongoose.model.SubCatogrey|| model ("SubCatogrey" , supcatagrySchema  )

export default  SubCatogeryModel