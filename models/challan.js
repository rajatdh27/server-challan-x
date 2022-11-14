const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const challanSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  vechileNum: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    required: true,
  },
  empID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Challan", challanSchema);
