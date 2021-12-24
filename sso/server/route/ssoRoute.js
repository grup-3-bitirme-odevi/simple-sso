const express = require("express");
const ssoController = require("../controller/ssoController");

const router = express.Router();

// SSO Server Post
router.route("/").post(ssoController.IsAuthorized);
// SSO Server Access Token Validation
router.route("/validate").post(ssoController.IsAccessTokenValid);
// SSO Server Available URL Validation
router.route("/checkurl").post(ssoController.CheckUrl);

module.exports = router;
