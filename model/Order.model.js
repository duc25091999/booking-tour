const mongoose = require("mongoose");
const {TourSchema} = require("./Tour.model")
const OrderSchema = mongoose.Schema({
    Tour: {
        type: TourSchema,
    },
    TourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tour",
    },
    AdultSeat: {
        type: Number,
    },
    ChildSeat: {
        type: Number,
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    SelectedAddon: {
        type: [Number] 
    },
    IsPaid: [{
        type: Boolean
    }]
})

module.exports = mongoose.model("Order", OrderSchema)