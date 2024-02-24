// import { object } from "joi";
import mongoose , {Schema , model , Types } from "mongoose";

const catagrySchema =   new Schema ({
  name : {
    type : String ,
    required : [true , "name is not required "],
    unique : [true , "name is not unique "],
    trim : true 
    
  },
  slug : {
    type : String ,
    required : [true , "slug is  required "],
    unique : [true , "slug is not unique "],
    trim : true 
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
    }
} , {timestamps : true })


const catogreyModel =  mongoose.model.Catogrey|| model ("Catogery" , catagrySchema  )

export default catogreyModel 