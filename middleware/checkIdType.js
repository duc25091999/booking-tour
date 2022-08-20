const ObjectId = require("mongoose").Types.ObjectId;

module.exports = function(req,res,next){
    if (ObjectId.isValid(req.params.id)) next()
    else res.status(400).send({ success: false, message: "Id không đúng định dạng" })
}