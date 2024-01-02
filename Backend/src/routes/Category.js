const express=require("express");
const Auth=require("../utils/Auth");
const router=express.Router();
const {getCategory}=require("../controller/categoryController")
// router.route("/add").post()
// router.route("/delete").delete()
// router.route("/update").patch()
router.route("/get").get(getCategory);

module.exports=router