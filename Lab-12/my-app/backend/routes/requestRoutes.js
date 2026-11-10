const express = require("express");
const { validateAdoptionRequest, validateRequestStatus } = require("../middleware/validate");
const controller = require("../controllers/requestController");
const { authenticate, authorizeRoles } = require("../middleware/authenticate");

const router = express.Router();
router.get("/", authenticate, authorizeRoles("admin"), controller.listRequests);
router.post("/", validateAdoptionRequest, controller.createRequest);
router.get("/:id", authenticate, authorizeRoles("admin"), controller.getRequest);
router.put("/:id", validateRequestStatus, authenticate, authorizeRoles("admin"), controller.updateRequest);
router.delete("/:id", authenticate, authorizeRoles("admin"), controller.deleteRequest);

module.exports = router;
