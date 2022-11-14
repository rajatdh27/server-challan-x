const express = require("express");

const router = express.Router();

const contactController = require("../controllers/contactHandler");

router.post("/contact", contactController.postContact);

module.exports = router;
