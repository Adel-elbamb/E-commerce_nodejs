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
    logo : {
      type : Object ,
      required : [true , " image is  not required " ]
    } ,
     addBy :  {
      type : Types.ObjectId ,
      required : [false , "user id is not required "] ,
      ref : "User"
     } ,
      isDeleted  : {
          type : Boolean ,
          default : false 
      } ,
      // catogeryId : {
      //     type : Types.ObjectId ,
      //     required : true ,
      //     ref : "Catogery"
      // } ,
      // SubcatogeryId : {
      //   type : Types.ObjectId ,
      //   required : true ,
      //   ref : "SupCatogery"
      // }
  } , {timestamps : true })


  const brandModel = mongoose.model.Brand || model("Brand" , brandSchema)

  export default brandModel



