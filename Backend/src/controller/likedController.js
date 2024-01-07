const Liked = require("../model/likedNotes");
const mongoose = require('mongoose');
const likedAdd = async (req, res) => {
    try {
        const ObjectId = req.body.id;
        let previousData = await Liked.findOne({ user: req.user.id });
        if (previousData) {
            previousData.Notes.push(ObjectId);
            console.log(previousData);
            await previousData.save();
            res.status(201).send({ message: "Note is added in Liked" });
        }
        else {
            const newLiked = new Liked({
                user: req.user.id,
                Notes: [ObjectId]
            })
            await newLiked.save();
            res.status(201).send({ message: "Note is added in Liked" });

        }
    }
    catch (e) {
        console.log('Error', e);
        res.send(e.error);
    }

}
const getAllLikedNotes = async (req, res) => {
    try {

        const data = await Liked.find({ user: req.user.id }).populate('Notes');
            res.send(data[0].Notes);
    }
    catch (e) {
        res.send(e);

    }
}

const deleteLikedNotesById=async (req,res)=>{
    const noteId= new mongoose.Types.ObjectId(req.params.id);
    const userId=req.user.id;
    console.log(noteId)
    try{
        console.log(userId)
        let result=await Liked.updateOne({user:userId},{$pull:{Notes:noteId}});
        console.log(result)
        res.status(200).send(noteId);
    }
    catch(e){
        console.log(e);

    }
}

module.exports = { likedAdd, getAllLikedNotes,deleteLikedNotesById };