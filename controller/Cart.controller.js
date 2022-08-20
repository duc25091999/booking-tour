const Cart = require("../model/Cart.model");
const User = require("../model/User.model")
const CartValidation = require("../validation/Cart.validation")
module.exports = {
    create: (userId) => {
        return async (res, req) => {
            try {
                const { error } = CartValidation(req.body);
                if (error) return res.status(400).send({ success: false, message: error.details[0].message });
                const exitCart = await Cart.find({ UserId: userId })
                if (exitCart) res.status(400).send({ success: false, message: "Người dùng đã có giỏ hàng" })
                const exitUser = await User.find({ _id: userId })
                if (!exitUser) res.status(400).send({ success: false, message: "Người dùng không tồn tại" })
                const cart = new Cart({ UserId: userId, CartItems: [] })
                await cart.save();
                return
            }
            catch (err) {
                res.status(400).send({ success: false, message: "Có lỗi xảy ra" })
            }
        }
    },
    getById: async (req, res) => {
        try {
            const cart = await Cart.findById(req.params.id);
            res.status(200).send({ cart: cart, success: true })
        }
        catch (err) {
            res.status(400).send({ success: false, message: "Có lỗi xảy ra" })
        }
    },
    delete: async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).send({ success: true })
        }
        catch (err) {
            res.status(400).send({ success: false, message: "Có lỗi xảy ra" })
        }
    },
    update: async (req, res) => {
        const { error } = CartValidation(req.body);
        if (error) return res.status(400).send({ success: false, message: error.details[0].message });
        try {
            await Cart.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send({ success: true, message: "Cập nhật giỏ hàng thành công" })
        }
        catch (err) {
            res.status(400).send({ success: false, message: "Cập nhật giỏ hàng thất bại" })
        }
    }

}