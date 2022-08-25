const { Tour } = require("../model/Tour.model");
const TourValidation = require("../validation/Tour.validation");

module.exports = {
  create: async (req, res) => {
    const { error } = TourValidation(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    try {
      const tour = new Tour({
        ...req.body,
        TotalLike: 0,
        TotalStar: 0,
        TotalComment: 0,
      });
      await tour.save();
      res.status(200).send({
        success: true,
        message: "Tạo tour thành công",
      });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  getAll: async (req, res) => {
    const { page = 1, size = 20, City = "", TotalLike = "" } = req.query;
    const filter = {
      City,
    };
    if (City == "") delete filter.City;
    const sort = {
      TotalLike,
    };
    if (TotalLike !== "asc" && TotalLike !== "desc") delete sort.TotalLike;
    try {
      const total = await Tour.find(filter);
      const tour = await (
        await Tour.find(filter)
      )
        .sort(TotalLike)
        .limit(size)
        .skip(size * (page - 1));
      res.status(200).send({ success: true, total: total.length, tour });
    } catch (error) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  getById: async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).send({ success: true, tour });
    } catch (err) {
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  update: async(req,res)=>{
    try {
      await Tour.findByIdAndUpdate(req.params.id,req.body);
      res.status(200).send({ success: true, message: "Cập nhật thành công" });
    }catch(err){
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }  
  },
  delete: async(req,res)=>{
    try {
      await Tour.findByIdAndUpdate(req.params.id,{isDeleted: true});
      res.status(200).send({ success: true, message: "Xoá thành công" });
    }catch(err){
      res.status(400).send({ success: false, message: "Có lỗi xảy ra" });
    }  
  }
};
