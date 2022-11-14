const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  email: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
