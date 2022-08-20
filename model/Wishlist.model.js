const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
    Tours: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Tour"
    }],
    UserId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        require: true
    }
})

module.exports = mongoose.model("Wishlist", WishlistSchema);