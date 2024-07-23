const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Message = mongoose.model("Message",MessageSchema)

module.exports = Message