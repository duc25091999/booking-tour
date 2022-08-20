const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    Content: {
        type: String,
    },
    Image: [{
        type: String,
    }],
    OwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    TourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tour",
    },
    Star: {
        type: Number
    }
})

module.exports = mongoose.model("Comment",CommentSchema)