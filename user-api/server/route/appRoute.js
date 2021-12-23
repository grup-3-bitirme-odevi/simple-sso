const express = require("express");
const appController = require("../controller/appController");
const appMiddleware = require("../middleware/appMiddleware");

const router = express.Router();

router.route("/").post(appMiddleware, appController.createUser);
router.route("/users/:user_id").delete(appMiddleware, appController.deleteUser)
router.route("/users/:user_id").put(appMiddleware, appController.updateUser)
router.route("/users/").get(appMiddleware, appController.getListOfUsers)


module.exports = router;
