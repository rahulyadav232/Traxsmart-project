const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    dateOfBirth: Date,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: Number,
    username: String,
    password: String,
    confirmPassword: String,
});


const User = mongoose.model("User", userSchema);

module.exports = User;
