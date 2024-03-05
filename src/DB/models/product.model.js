//  import { object } from "joi";
import { Schema , Types, model  } from "mongoose";


 const ProductSchema = new Schema ({
    
    name : {
        type : String ,
        required : [true , "name is required "],
        trim : true ,
        lowercase : true 
        
      },
      slug : {
        type : String ,
        required : [true , "slug is  required "],
        trim : true ,
        lowercase : true 
      } , 
      mainImage : {
        type : Object ,
        required : [true , " image is   required " ]
      } ,
      subImage : {
        type : Object 
      },
      price : {
        type : Number ,
        required : true 
      } ,
      totalPrice : {
        type : Number 
      },
      descount : {
       type : Number , 
       default : 0 
      } ,
      custemId : {
        type : String , 

      } , 
      catogeryId : {
        type : Types.ObjectId ,
        ref : "Catogery"
      },
      subCatogeryId  : {
        type : Types.ObjectId ,
        ref : "Subcatogery"
      } , 
      brandId : {
        type : Types.ObjectId ,
        ref : "Brand "
      },
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
 },
 {
    timestamps : true 
 }
    
    )
    const productModel = model('Product' , ProductSchema)

    export default productModel 