import mongoose from "mongoose";

const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    email: String,
    password: String
}));

module.exports = User;