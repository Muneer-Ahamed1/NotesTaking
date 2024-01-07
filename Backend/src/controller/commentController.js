const Comment = require("../model/Comment");
const mongoose = require('mongoose');
const ApiError = require("../utils/ApiError");

const addComment = async (req, res, next) => {
    try {
        const { comment, commentId, noteId } = req.body;

        if (noteId && !commentId) {
            const newComment = new Comment({
                comment: comment,
                user: req.user.id,
                note: noteId
            });

            const data = await newComment.save();
            return res.status(201).send("comment is added");
        }

        if (commentId) {
            const parentComment = await Comment.findById(commentId);
            console.log(parentComment);

            if (parentComment) {
                const data = new Comment({
                    comment: comment,
                    user: req.user.id,
                    note: noteId
                });

                parentComment.message.push(data); // No need for mongoose.Types.ObjectId
                await parentComment.save();
            }

            return res.status(200).json("Sub comment is added !!");
        }
    } catch (e) {
        console.error(e);
        next(new ApiError(e?.errors || 'Something went wrong', 404)); // Consider using a more appropriate status code
    }
};


 const getComment=async (req,res,next)=>{
    try{
        console.log(req.body.noteId);
        let comments=await Comment.find({$and:[{note : req.body.noteId},{user:req.user.id}]}).populate("message");
        console.log(comments);

    
        res.status(200).send(comments);
    
    }
    catch(e){
        console.log(e)
        next(new ApiError('Could not find the notes',404));
    }
}

module.exports={addComment,getComment};