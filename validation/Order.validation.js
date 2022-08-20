const Joi = require("@hapi/joi")

const OrderValidation = (data) => {
    const schema = Joi.object({
        Tour: Joi.object({
            _id:Joi.string().min(6).max(255).required,
            Image: Joi.array().items(Joi.string().min(6).max(255).required),
            SliceImage: Joi.array().items(Joi.string().min(6).max(255).required),
            TourDetail: Joi.string().min(6).max(900).required,
            TourSummary: Joi.string().min(6).max(255).required,
            Notice: Joi.string().min(6).max(255).required,
            PricePerAdult: Joi.number().required,
            PricePerChild:Joi.number().required,
            City: Joi.string().min(6).max(50).required,
            Addon: Joi.array().items(Joi.object({
                Title: Joi.string().min(6).max(255).required,
                Detail:Joi.string().min(6).max(50).required,
                Price:Joi.number()
            }))     
        }).required,
        TourId:Joi.string().min(6).max(255).required,
        AdultSeat: Joi.number().required,
        ChildSeat: Joi.number().required,
        UserId: Joi.string().min(6).max(255).required ,
        SelectedAddon: Joi.array().items(Joi.number()),
        IsPaid: Joi.boolean(),
    })
    return schema.validate(data);
}

module.exports = OrderValidation;