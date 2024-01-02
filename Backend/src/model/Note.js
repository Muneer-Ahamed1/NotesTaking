const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const User = require("./User");

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: ObjectId,
        ref: "User" 
    },
    category: {
        type: String,
        required: true
    }
},
    {
        timestamps: true, 
    });
module.exports = mongoose.model("Note", NoteSchema);
