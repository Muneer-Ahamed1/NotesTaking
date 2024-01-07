const express=require("express");
const Auth=require("../utils/Auth");
const { noteAdd,noteGetAll,filterNotes,getNotesById,deleteNoteById,editNoteById,noteGetAllUser }=require("../controller/noteController")
const router=express.Router();

router.route("/addNote").post(Auth,noteAdd);
router.route("/getAllNote").get(Auth,noteGetAll);
router.route("/getAllNoteUser").get(Auth,noteGetAllUser);
router.route("/filterNotes").get(Auth,filterNotes);
router.route("/notesBy/:id")
.get(getNotesById)
.delete(deleteNoteById)
.patch(editNoteById)

module.exports=router;
