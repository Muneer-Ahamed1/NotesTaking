const express=require("express");
const Auth=require("../utils/Auth");
const router=express.Router();
const {addComment,getComment} =require("../controller/commentController");

router.route("/addComment").post(Auth,addComment);
router.route("/getComment").get(Auth,getComment)


module.exports=router;
