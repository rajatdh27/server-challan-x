const Challan = require("../models/challan");
const User = require("../models/user");
const fs = require("fs");
const PDFDoc = require("pdfkit");

let location;
let vechileNum;
let description;
let file;

exports.postAddChallan = (req, res, next) => {
  console.log(req.file);
  location = req.body.location;
  vechileNum = req.body.vehicleNum;
  description = req.body.desc;
  file = req.file;

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
        empID: user,
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      });
      console.log("challan44");
      console.log(user);
      challan
        .save()
        .then((result) => {
          console.log("Created challan");
          user.addTochallanArray(challan);
          console.log("HP");
          res.sendStatus(200);
          console.log(45);
        })
        .catch((err) => {
          console.log(err);
          res.status().send(400);
        });
    })
    .catch((err) => console.log(err));
};

exports.getPdf = (req, res, next) => {
  console.log("yuiyiuiy");
  console.log(req.body);
  const imga = `data:image/png;base64,${file.buffer.toString("base64")}`;
  const pdfOne = new PDFDoc();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=challan__.pdf");
  pdfOne.pipe(fs.createWriteStream(`challan__.pdf`));
  pdfOne.pipe(res);
  pdfOne.text(`Challan Created!`);
  pdfOne.image(imga, {
    fit: [250, 300],
    align: "center",
  });
  pdfOne.text(`\nLocation: ${location}`);
  pdfOne.text(`\nVehcile Num: ${vechileNum}`);
  pdfOne.text(`\nDescription: ${description}`);
  pdfOne.end();
  next();
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
