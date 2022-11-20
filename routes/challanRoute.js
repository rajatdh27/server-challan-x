const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const challanController = require("../controllers/challanHandler");

router.post(
  "/add-challan",
  upload.single("file"),
  challanController.postAddChallan
);

router.post("/all-challan", challanController.getAllChallan);
module.exports = router;
