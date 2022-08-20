const User = require("../model/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  create: async (req, res) => {
    try {
      const emailExist = await User.findOne({ Email: req.body.Email });
      if (emailExist) return res.status(400).send("Email này đã được sử dụng");
      const nameExist = await User.findOne({ Name: req.body.Name });
      if (nameExist) return res.status(400).send("Tên đăng nhập đã được sử dụng");
      const phoneExist = await User.findOne({ Name: req.body.Phone });
      if (phoneExist) return res.status(400).send("Số điện thoại đã được sử dụng");

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        Email: req.body.Email,
        Phone: req.body.Phone,
        Name: req.body.Name,
        Password: hashPassword,
      });
      await user.save();
      res.status(200).send({ success: true, message: "Đăng ký thàng công" });
    } catch (err) {
      res.status(200).send({ success: false, message: "Có lỗi xảy ra" });
      throw err;
    }
  },

  changePassword: async (req, res) => {
    try {
      if (req.body.Password == req.body.Re_password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.Password, salt);
        await User.findOneAndUpdate(
          { _id: req.params.id },
          {
            Password: hashPassword,
          }
        );
        res.send({ success: true, message: "Cập nhật mật khẩu thành công" });
      }
      else {
        res.send({ success: true, message: "Mật khẩu không trùng khớp" });
      }
    } catch (err) {
      res.status(200).send({ success: false, message: "Có lỗi xảy ra" });
    }
  },
  login: async (req, res) => {
    const user = await User.findOne({ name: req.body.Email });
    if (!user)
      return res.send({
        success: false,
        message: "Email chưa đăng ký",
      });
    const validPass = await bcrypt.compare(req.body.Password, user.Password);
    if (!validPass)
      return res.send({ success: false, message: "Mật khẩu không đúng" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ success: true, userId: user._id, token: token });
  },
};