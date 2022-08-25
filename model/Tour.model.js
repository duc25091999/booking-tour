const mongoose = require("mongoose");
const {AddonSchema} = require("../model/Addon.model")
const TourSchema = mongoose.Schema({
    Image: [{
        type: String,
    }],
    SliceImage: [{
        type: String,
    }],
    TourDetail:{
        type: String,
    },
    TourSummary: {
        type: String,
    },
    Notice: {
        type: String,
    },
    TotalLike: {
        type: Number,
    },
    TotalStar: {
        type: Number,
    },
    TotalComment: {
        type: Number,
    },
    PricePerAdult: {
        type: Number,
    },
    PricePerChild:{
        type: Number,
    },
    City: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    Addon: [{
        type: AddonSchema,
        ref: "Addon"
    }]
})

module.exports = {Tour:mongoose.model("Tour", TourSchema),TourSchema:TourSchema}