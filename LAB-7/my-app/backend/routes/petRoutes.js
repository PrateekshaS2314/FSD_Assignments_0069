const express = require("express");
const { validatePet } = require("../middleware/validate");
const controller = require("../controllers/petController");

const router = express.Router();
router.get("/", controller.listPets);
router.post("/", validatePet, controller.createPet);
router.get("/:id", controller.getPet);
router.put("/:id", validatePet, controller.updatePet);
router.delete("/:id", controller.deletePet);

module.exports = router;
