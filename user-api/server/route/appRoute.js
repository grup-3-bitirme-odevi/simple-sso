const express = require("express");
const appController = require("../controller/appController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.route("/users").post(authMiddleware, roleMiddleware(["admin"]), appController.createUser);
router.route("/users").get(authMiddleware, roleMiddleware(["admin"]), appController.getListOfUsers);
router.route("/users/:user_id").put(authMiddleware, roleMiddleware(["admin"]), appController.updateUser);
router.route("/users/:user_id").delete(authMiddleware, roleMiddleware(["admin"]), appController.deleteUser);
router.route("/users/info").get(authMiddleware, roleMiddleware(["admin","user"]), appController.getUserInfo);

module.exports = router;
