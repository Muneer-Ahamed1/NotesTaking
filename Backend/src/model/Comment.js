const mongoose=require("mongoose");
const { ObjectId } = mongoose.Types;
const User=require("./User");
const Note=require("./Note");


const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:User,
        required:[true,"Post comment or disgard it"]
    },
    note:{
        type:ObjectId,
        ref:Note,
        required:true
    },
    message:[{
        type:ObjectId,
        ref:"comments"
    }]

})

module.exports=mongoose.model("comment",commentSchema)