const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
        require: true
    },
    Phone: {
        type: String
    },
    Password: {
        type: String
    }
})

module.exports = mongoose.model("User", UserSchema);