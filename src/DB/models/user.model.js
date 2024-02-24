import mongoose,{ Schema , model } from "mongoose";

const userSchema = new Schema ({
    name : {
        type : String ,
        required : [true , "name is required "] ,
        minLenght : 2 ,
        maxLenght : 20 ,
        trim : true 
    } ,
    email : {
        type : String ,
        unique : [true , "email is uniqe"]  ,
        required : [true , "email is required"],
        trim : true , 
        lowercase : true 
    } ,
    password : {
        type : String ,
        required : [true , "password is required"],
    } ,
     phone : {
        type : String , // is make 
        required : [true , "phone is required"],
        unique : [true , "phone is uniqe"]  ,
     } ,
     confirmed  : {
        type : Boolean ,
        default : false
     } , 
     age : {
        type : Number
     }, 
     adress : {
        type : String ,
        required : [true , "adress  is required"],
     },
     loggedIn : {
        type : Boolean ,
        default : false
     } , 
     role : {
        type : String ,
        enum : ['User' , "Admin"] ,
        default : "User"
     }
    
}, {timestamps : true })

const userModel = mongoose.model.User||model("User" , userSchema)