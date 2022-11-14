const { ObjectId } = require("mongodb");
const Challan = require("../models/challan");
const User = require("../models/user");

exports.authentication = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let auth;
  User.findOne({ email: email }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs) {
        req.user = docs;
        console.log(req.user.password);
        if (req.user.password === password) {
          auth = true;
        } else {
          auth = false;
          req.user = null;
        }
        res.send({ ...docs, auth: auth });
      } else {
        res.send({ message: "user don't exist" });
        console.log("sign error");
      }
    }
  });
};
