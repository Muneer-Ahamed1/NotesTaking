const serverError=(err,req,res,next)=>{
    res.status(500).json({message:"Server issue which 500"});
}

module.exports=serverError;