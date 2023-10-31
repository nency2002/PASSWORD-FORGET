const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
});

const passports = mongoose.model("passports", userSchema)

module.exports =passports