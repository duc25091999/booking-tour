const Joi = require("@hapi/joi")

const TourValidation = (data) => {
    const schema = Joi.object({
        Image: Joi.array().items(Joi.string().min(6).max(255).required),
        SliceImage: Joi.array().items(Joi.string().min(6).max(255).required),
        TourDetail: Joi.string().min(6).max(900).required,
        TourSummary: Joi.string().min(6).max(255).required,
        Notice: Joi.string().min(6).max(255).required,
        TotalLike:Joi.number().required,
        TotalStar:Joi.number().required,
        TotalComment:Joi.number().required,
        PricePerAdult: Joi.number().required,
        PricePerChild: Joi.number().required,
        City: Joi.string().min(6).max(50).required,
        Addon: Joi.array().items(Joi.object({
            Title: Joi.string().min(6).max(255).required,
            Detail: Joi.string().min(6).max(50).required,
            Price: Joi.number()
        }))
    })
    return schema.validate(data)
}
module.exports = TourValidation;