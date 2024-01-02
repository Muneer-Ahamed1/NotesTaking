const mongoose=require("mongoose");
const { ObjectId } = mongoose.Types;
const User=require("./User");
const Note=require("./Note");

const likedSchema=mongoose.Schema({
    Notes:[{
        type:ObjectId,
        ref:Note
    }],
    user:{
        type:ObjectId,
        ref:User
    }
},{
    timestamps: true, // This option adds createdAt and updatedAt fields
  })

module.exports=mongoose.model("LikedNote",likedSchema);