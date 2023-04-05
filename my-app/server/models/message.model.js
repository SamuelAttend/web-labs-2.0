import mongoose from "mongoose";

const Message = mongoose.model("Message", new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    time: Date,
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}));

module.exports = Message;