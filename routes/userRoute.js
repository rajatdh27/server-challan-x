const express = require("express");

const router = express.Router();

const userController = require("../controllers/userHanlder");

router.post("/add-user", userController.postAddUser);

module.exports = router;
