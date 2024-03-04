// import { object } from "joi";
import mongoose , {Schema , model , Types } from "mongoose";

const catagrySchema =   new Schema ({
  name : {
    type : String ,
    required : [true , "name is required "],
    unique : [true , "name is  unique "],
    trim : true ,
    lowercase : true 
    
  },
  slug : {
    type : String ,
    required : [true , "slug is  required "],
    unique : [true , "slug is  unique "],
    trim : true ,
    lowercase : true 
  } , 
  image : {
    type : Object ,
    required : [true , " image is   required " ]
  } ,
   createdBy :  {
    type : Types.ObjectId ,
    required : [false , "user id is  required "] ,
    ref : "User"
   } ,
   updatedBy : {
    type : Types.ObjectId ,
    ref : "User"
   } ,
    isDeleted  : {
        type : Boolean ,
        default : false 
    }
} , {
  timestamps : true ,
  toJSON : {virtuals : true }  , // used  in veruiel puplote  using to convert vartual data to json 
  toObject : {virtuals : true} // used  in veruiel puplote using to convert vartual data to object
 })
 
 catagrySchema.virtual('SubCatogrey' , { //virtual using to create virtaul object in catogery ref in subcatogery
  ref : "SubCatogrey" ,
  localField : "_id"  , // id of catogery 
  foreignField : "catogeryId", // id of catogery in subcatogery 
  justOne : true  
 })


const catogreyModel =  mongoose.model.Catogery|| model ("Catogery" , catagrySchema  )

export default catogreyModel 