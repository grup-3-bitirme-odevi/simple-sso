const express = require("express");
const ssoController = require("../controller/ssoController");
const ssoMiddleware = require("../middleware/ssoMiddleware");

const router = express.Router();

router.route("/").post(ssoMiddleware, ssoController.IsAuthorized);

module.exports = router;
