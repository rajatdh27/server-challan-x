const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  empID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  challanArray: {
    allChallans: [
      {
        challanId: {
          type: Schema.Types.ObjectId,
          ref: "Challan",
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addTochallanArray = function (challan) {
  const cID = challan._id;
  const updatedChallans = [...this.challanArray.allChallans];
  updatedChallans.push({
    challanId: cID,
  });
  console.log(updatedChallans);

  const updatedChallan = {
    challanArray: updatedChallans,
  };
  console.log(updatedChallan);
  this.challanArray.allChallans = updatedChallans;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
