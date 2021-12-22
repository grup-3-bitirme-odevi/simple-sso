const express = require("express");
const appController = require("../controller/appController");
const appMiddleware = require("../middleware/appMiddleware");

const router = express.Router();

// router.route("/").post(appController, appController.createUser);

module.exports = router;
