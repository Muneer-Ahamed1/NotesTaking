const express=require("express");
const {register,login,logout,refreshTokenAccess}=require("../controller/userController");
const Auth=require("../utils/Auth");
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/hello").get(Auth,(req,res)=>{
    res.send("I am inside the hello route");
})
router.route("/logout").get(Auth,logout)
router.route("/refreshToken").post(refreshTokenAccess);

module.exports=router;