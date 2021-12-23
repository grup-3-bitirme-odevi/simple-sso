const express = require("express");
const ssoController = require("../controller/ssoController");
const ssoMiddleware = require("../middleware/ssoMiddleware");

const router = express.Router();

router.route("/").post(ssoMiddleware, ssoController.IsAuthorized);
router.route("/validate").post(ssoMiddleware, ssoController.IsAccessTokenValid);
router.route("/checkurl").post(ssoMiddleware, ssoController.CheckUrl);

module.exports = router;
