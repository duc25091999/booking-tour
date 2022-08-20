const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
    CartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CartItem"
    }]
})
 
module.exports = mongoose.model("Cart",CartSchema)