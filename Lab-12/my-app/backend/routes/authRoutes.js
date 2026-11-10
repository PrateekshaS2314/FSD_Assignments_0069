const express = require("express");
const controller = require("../controllers/authController");
const { authenticate, authorizeRoles } = require("../middleware/authenticate");

const router = express.Router();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", authenticate, controller.profile);
router.get("/admin", authenticate, authorizeRoles("admin"), controller.adminDashboard);

module.exports = router;
