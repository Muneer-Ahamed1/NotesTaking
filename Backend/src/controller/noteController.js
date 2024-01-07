const Note = require("../model/Note");
const ApiError=require("../utils/ApiError");
const noteAdd = async (req, res,next) => {
    const note = req.body;
    try {

        const newNote = Note({ ...note, user: req.user.id });
        await newNote.save();
        res.status(200
            ).json("Your is Note is added");
    }
    catch (e) {
        next(new ApiError("Note is not added due to some reason",404));
    }


}

const noteGetAllUser = async (req, res) => {
    const userId=req.user.id;
    console.log(userId)
    let notes = await Note.find({user:userId}).populate('user');

    
    if (!notes) {
        return res.status(404).json('No notes found');
    } else {
        res.status(200).json(notes);
    }
}

 const noteGetAll = async (req, res) => {
     const userId=req.user.id;
     console.log(userId)
     let notes = await Note.find({}).populate('user');

    
     if (!notes) {
         return res.status(404).json('No notes found');
     } else {
         res.status(200).json(notes);
    }
 }

const filterNotes = async (req, res) => {
    try {
      let filterNote = {};
      let { page, category,search } = req.query;
      page = parseInt(page) || 1;
      let limit = 10;
      let skip = limit * (page - 1);
  
      let notesQuery = Note.find({}).skip(skip).limit(limit);
  
      if (category) {
        notesQuery = notesQuery.where('category').equals(category);
      }
      if(search) {
        console.log(search);
        const searchRegex = new RegExp(search, 'i');

    notesQuery = Note.find({
        description: { $regex: searchRegex }
    });

        console.log(notesQuery);
      }
  
      filterNote = await notesQuery.exec();
  
      res.status(200).json(filterNote);
    } catch (error) {
      console.error('Error filtering notes:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

//get by id

const getNotesById=async(req,res)=>{
    const note=await Note.findById(req.params.id)
    if(!note){
        return res.status(404).send("The note with the given ID was not found.")
    }
    res.status(200).json(note)
}


//delete by id

const deleteNoteById=async(req,res)=>{
    const note = await Note.findByIdAndDelete(req.params.id);
    if(!note) {
        return res.status(400).send("The note with the given ID was not found.");
    }
    res.status(200).send(req.params.id);
}
//edit by id
const editNoteById=async(req,res)=>{
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!note){
        return res.status(400).send("The note with the given ID was not found.");
    }
    res.status(200).json(note)
}





module.exports = { noteAdd,noteGetAll,filterNotes,getNotesById,deleteNoteById,editNoteById,noteGetAllUser };