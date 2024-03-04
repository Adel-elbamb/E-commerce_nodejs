import mongoose  , {Schema , model , Types } from "mongoose";

const brandSchema =   new Schema ({
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
      required : [true, " image is required " ]
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
      isDeleted  : {
          type : Boolean ,
          default : false 
      } ,
      catogeryId : {
          type : Types.ObjectId ,
          required : true ,
          ref : "Catogery"
      } ,
      subcatogeryId : {
        type : Types.ObjectId ,
        required : true ,
        ref : "SupCatogery"
      }
  } , {timestamps : true })


  const brandModel = mongoose.model.Brand || model("Brand" , brandSchema)

  export default brandModel



