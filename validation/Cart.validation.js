const Joi = require("@hapi/joi")

const CartValidation = (data) => {
    const schema = Joi.object({
        UserId: Joi.string().min(6).max(255).required ,
        CartItem: Joi.string().min(6).max(255).required ,
    })
    return schema.validate(data);
}

module.exports = CartValidation