const mongoose= require('mongoose');
const LinkSchema = new mongoose.Schema({
    // userId cua Link se la user.js ben kia
    // theo thu tu la user, oldLink , newLink, 
    //solan click
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }  ,
    oldLink:{
        type:String,
        required:true
    },
    shortLink:{
        type:String,
        default:""
    },
    click: {
        type:Number,
        default:0
    }

},{timestamps: true})

module.exports=LinkSchema;