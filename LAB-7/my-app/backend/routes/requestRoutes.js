const express = require("express");
const { validateAdoptionRequest, validateRequestStatus } = require("../middleware/validate");
const controller = require("../controllers/requestController");

const router = express.Router();
router.get("/", controller.listRequests);
router.post("/", validateAdoptionRequest, controller.createRequest);
router.get("/:id", controller.getRequest);
router.put("/:id", validateRequestStatus, controller.updateRequest);
router.delete("/:id", controller.deleteRequest);

module.exports = router;
