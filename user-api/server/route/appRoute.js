const express = require("express");
const appController = require("../controller/appController");
const appMiddleware = require("../middleware/appMiddleware");

const router = express.Router();

router.route("/").post( appController.createUser);
router.route( "/users/:user_id").delete(appController.deleteUser)
router.route( "/users/:user_id").put(appController.updateUser)
router.route( "/users/").get(appController.getListOfUsers)


module.exports = router;
