const ApiError=require("../utils/ApiError")
const customError=(err,req,res,next)=>{
    console.log("Custom Error")
    if(err instanceof ApiError) {
       return res.status(err.statusCode).json({message: err.message});
    }
    next(err);
}
module.exports=customError;