const express = require("express");
const ssoController = require("../controller/ssoController");

const router = express.Router();

router.route("/").post(ssoController.IsAuthorized);
router.route("/validate").get(ssoController.IsAccessTokenValid);

module.exports = router;
