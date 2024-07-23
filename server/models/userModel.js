const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePhoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    }
}
,{
timestamps:true
})

const User = mongoose.model("User",UserSchema)
module.exports = User
