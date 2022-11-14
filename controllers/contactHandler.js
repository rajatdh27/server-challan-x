const Challan = require("../models/challan");
const User = require("../models/user");
const Contact = require("../models/contact");

exports.postContact = (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const description = req.body.message;
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      const contact = new Contact({
        email: user,
        subject: subject,
        description: description,
      });
      contact
        .save()
        .then((result) => {
          console.log(result);
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    })
    .catch();
};
