const express=require("express");
const Auth=require("../utils/Auth");
const router=express.Router();
const {likedAdd,getAllLikedNotes,deleteLikedNotesById}=require("../controller/likedController");
router.route("/addlikedNote").post(Auth,likedAdd)
router.route("/getAllLikedNotes").get(Auth,getAllLikedNotes);
router.route("/deleteLikedNotesById/:id").delete(Auth,deleteLikedNotesById);

module.exports=router;


