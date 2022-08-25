const Joi = require("@hapi/joi")

const WishlistValidation = (data) => {
    const schema = Joi.object({
        Tours: Joi.array().items(Joi.string()),
        UserId: Joi.string().required,
    })
    return schema.validate(data)
}

module.exports = WishlistValidation