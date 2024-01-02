const express=require("express");
const Auth=require("../utils/Auth");
const { noteAdd,noteGetAll,filterNotes,getNotesById,deleteNoteById,editNoteById }=require("../controller/noteController")
const router=express.Router();

router.route("/addNote").post(Auth,noteAdd);
router.route("/getAllNote").get(Auth,noteGetAll);
router.route("/filterNotes").get(Auth,filterNotes);
router.route("/notesBy/:id")
.get(getNotesById)
.delete(deleteNoteById)
.patch(editNoteById)

module.exports=router;
