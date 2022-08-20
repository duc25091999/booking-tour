const Order = require("../model/Order.model");
const OrderValidation = require("../validation/Order.validation");
module.exports = {
  create: async (req, res) => {
    const { error } = OrderValidation(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    try {
      const order = new Order(req.body);
      await order.save();
      res
        .status(200)
        .send({
          success: true,
          message: "Cảm ơn đã đặt hàng. Chúng tôi sẽ liên lạc với bạn sớm nhất",
        });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Order.findByIdAndDelete(id);
      res
        .status(200)
        .send({ success: true, message: "Xoá đơn hàng thành công" });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  getOrder: async (req, res) => {
    const { page = 1, size = 20, TourId = "", IsPaid = true } = req.query;
    const filter = {
      TourId,
      IsPaid,
    };
    if (TourId == "") {
      delete filter.TourId;
    }
    try {
      const total = await Order.find(filter);
      const order = await Order.find(filter)
        .limit(size)
        .skip(size * (page - 1));
      res.status(200).send({
        success: true,
        total: total.length,
        order,
      });
    } catch (err) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  update: async(req,res)=>{
    const {id} = req.params;
    
  }
};
