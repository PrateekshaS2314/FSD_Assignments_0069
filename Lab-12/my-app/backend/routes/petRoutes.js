const express = require("express");
const { validatePet } = require("../middleware/validate");
const controller = require("../controllers/petController");
const { authenticate, authorizeRoles } = require("../middleware/authenticate");

const router = express.Router();
router.get("/", controller.listPets);
router.post("/", validatePet, authenticate, authorizeRoles("admin"), controller.createPet);
router.get("/:id", controller.getPet);
router.put("/:id", validatePet, authenticate, authorizeRoles("admin"), controller.updatePet);
router.delete("/:id", authenticate, authorizeRoles("admin"), controller.deletePet);

module.exports = router;
