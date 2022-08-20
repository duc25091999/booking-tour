const mongoose = require("mongoose");

const AddonSchema = mongoose.Schema({
    Title: {
        type: String,
    },
    Detail: {
        type: String,
    },
    Price: {
        type: Number,
    }
})

module.exports = { AddonSchema: AddonSchema }