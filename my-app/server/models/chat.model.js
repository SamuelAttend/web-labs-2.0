import mongoose from "mongoose";

const Chat = mongoose.model("Chat", new mongoose.Schema({
    name: String,
    participants: [String],
    owner: String,
    messages: [{
        text: String,
        author: String,
        date: String
    }]
}));

module.exports = Chat;