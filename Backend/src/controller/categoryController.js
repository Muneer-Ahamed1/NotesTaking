const Category=require("../model/Category");
const ApiError=require("../utils/ApiError")
const getCategory=async(req,res,next)=>{
    try{
       const category= await Category.find({});
       res.status(201).json(category);
    }
    catch(e){
        next(new ApiError(e.errors,404));


    }
}


module.exports={getCategory}