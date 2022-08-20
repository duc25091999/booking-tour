const CartItem = require("../model/CartItem.model");
const CartItemValidation = require("../validation/CartItem.validation");
module.exports = {
  create: async (req, res) => {
    const { error } = CartItemValidation(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });
    try {
        const cartitem = new CartItem(req.body);
        await cartitem.save()
        return res.status(200).send({success:true,message:"Thêm vào giỏ hàng thành công"})
    }catch(err){
        res.status(400).send({success:false,message:"Có lỗi xảy ra"})
    }
  },
  updateSeatAndAddon: async (req,res)=> {
      const {id} = req.params;
      const {AdultSeat,ChildSeat,SelectedAddon} = req.body;
      try{
        await CartItem.findByIdAndUpdate(id,{AdultSeat,ChildSeat,SelectedAddon});
        res.status(200).send({success:true,message:"Cập nhật thành công"})
    }catch(err){
        res.status(400).send({success:false,message:"Có lỗi xảy ra"})
    }
  },
  getById: async (req,res) => {
    const {id} = req.params;
    try {
        const cartitem = await CartItem.getById(id)
        res.status(200).send({success:true,cartitem:cartitem})
    }catch (err){
        res.status(400).send({success:false,message:"Có lỗi xảy ra"})
    }
  },
  delete: async (req,res)=>{
    try {
        await CartItem.findByIdAndDelete(req.params.id);
        res.status(200).send({success:true,message:"Xóa thành công"})
    }catch(err){
        res.status(400).send({success:false,message:"Có lỗi xảy ra"})
    }
  }
};
