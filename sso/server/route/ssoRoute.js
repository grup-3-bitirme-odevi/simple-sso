const express = require("express");
const ssoController = require("../controller/ssoController");
const ssoMiddleware = require("../middleware/ssoMiddleware");

const router = express.Router();

// SSO Server Post
router.route("/").post(ssoMiddleware, ssoController.IsAuthorized);
// SSO Server Access Token Validation
router.route("/validate").post(ssoMiddleware, ssoController.IsAccessTokenValid);
// SSO Server Available URL Validation
router.route("/checkurl").post(ssoMiddleware, ssoController.CheckUrl);

module.exports = router;
