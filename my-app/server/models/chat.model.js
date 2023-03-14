import mongoose from "mongoose";

const Chat = mongoose.model("Chat", new mongoose.Schema({
    name: String,
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}));

module.exports = Chat;