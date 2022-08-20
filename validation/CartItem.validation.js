const Joi = require("@hapi/joi")

const CartItemValidation = (data) => {
    const schema = Joi.object({
        TourId: Joi.string().min(6).max(255).required ,
        AdultSeat: Joi.number().required,
        ChildSeat: Joi.number().required,
        SelectedAddon: Joi.array().items(Joi.number()),
    });
    return schema.validate(data);
}

module.exports = CartItemValidation