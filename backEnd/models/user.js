const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 15
    }
});

module.exports = mongoose.model("User", UserSchema);