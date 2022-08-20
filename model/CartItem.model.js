const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema({
    TourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour"
    },
    AdultSeat: {
        type: Number,
    },
    ChildSeat: {
        type: Number,
    },
    SelectedAddon: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Addon"
    }]
})

module.exports = mongoose.model("CartItem",CartItemSchema)