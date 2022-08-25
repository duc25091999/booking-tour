const Wishlist = require("../model/Wishlist.model");
const WishlistValidation = require("../validation/Wishlist.validation");

module.exports = {
  create: async (req, res) => {
    const { error } = WishlistValidation(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    try {
      const wishlist = new Wishlist(req.body);
      wishlist.save();
      res.status(200).send({ success: true, wishlistId: wishlist._id });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  getById: async (req, res) => {
    try {
      const wishlist = await Wishlist.findById(req.params.id);
      res.status(200).send({ success: true, data: wishlist });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  getByUserId: async (req, res) => {
    try {
      const wishlist = await Wishlist.find({ UserId: req.params.id });
      res.status(200).send({ success: true, data: wishlist });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  update: async (req, res) => {
    const { error } = WishlistValidation(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    try {
      await Wishlist.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send({ success: true, message: "Cập nhật thành công" });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
};
