import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {};

db.user = reqire("./user.model");
db.chat = require("./chat.model");
db.message = require("./chat.model");

module.exports = db;