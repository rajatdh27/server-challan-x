const Challan = require("../models/challan");
const User = require("../models/user");
const fs = require("fs");

exports.postAddChallan = (req, res, next) => {
  console.log(req.body);
  const location = req.body.location;
  const vechileNum = req.body.vehicleNum;
  const description = req.body.desc;

  User.findOne({ empID: req.body.id })
    .then((user) => {
      req.user = user;
      req.auth = true;
      console.log(user._id);
      console.log(req.file);
      const challan = new Challan({
        location: location,
        vechileNum: vechileNum,
        description: description,
        img: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/jpeg",
        },
        empID: user,
      });
      console.log("challan44");
      console.log(user);
      challan
        .save()
        .then((result) => {
          console.log("Created challan");
          user.addTochallanArray(challan);
          console.log(result);
          res.setHeader("Content-Type", "text/html");
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status().send(400);
        });
    })
    .catch((err) => console.log(err));
};

exports.getAllChallan = (req, res) => {
  console.log(req.body);

  User.findOne({ empID: req.body.empID })
    .then((user) => {
      Challan.find({ empID: user._id })
        .then((result) => {
          res.send(result);
          console.log(result);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
