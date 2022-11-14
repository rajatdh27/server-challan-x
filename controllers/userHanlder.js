const User = require("../models/user");

exports.postAddUser = (req, res, next) => {
  const empID = req.body.empID;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const challanArray = { allChallans: [] };
  let auth;
  console.log(req.body);
  const user = new User({
    empID: empID,
    email: email,
    lastName: lastName,
    firstName: firstName,
    password: password,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      auth = true;
      req.user = user;
      res.send({ ...result, auth });
    })
    .catch((err) => {
      console.log(err);
      res.send(400);
    });
};
