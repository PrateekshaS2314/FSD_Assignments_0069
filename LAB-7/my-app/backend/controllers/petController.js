const mongoose = require("mongoose");
const Pet = require("../models/Pet");
const AdoptionRequest = require("../models/AdoptionRequest");

async function listPets(req, res, next) {
  try {
    const filter = {};
    if (req.query.animalType && !["Dog", "Cat", "Other"].includes(String(req.query.animalType))) {
      return res.status(400).json({ message: "animalType must be Dog, Cat, or Other." });
    }
    if (req.query.adoptionStatus && !["Available", "Adopted"].includes(String(req.query.adoptionStatus))) {
      return res.status(400).json({ message: "adoptionStatus must be Available or Adopted." });
    }
    if (req.query.age && !["puppy", "young", "adult", "senior"].includes(String(req.query.age))) {
      return res.status(400).json({ message: "age must be puppy, young, adult, or senior." });
    }
    if (req.query.animalType && ["Dog", "Cat", "Other"].includes(String(req.query.animalType))) filter.animalType = String(req.query.animalType);
    if (req.query.adoptionStatus && ["Available", "Adopted"].includes(String(req.query.adoptionStatus))) filter.adoptionStatus = String(req.query.adoptionStatus);
    const search = String(req.query.search || "").trim();
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = ["petName", "breed", "description", "location"].map((field) => ({ [field]: { $regex: escaped, $options: "i" } }));
    }
    if (req.query.age === "puppy") filter.age = { $lt: 1 };
    else if (req.query.age === "young") filter.age = { $gte: 1, $lt: 4 };
    else if (req.query.age === "adult") filter.age = { $gte: 4, $lt: 8 };
    else if (req.query.age === "senior") filter.age = { $gte: 8 };
    const pets = await Pet.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ pets });
  } catch (error) {
    next(error);
  }
}

async function getPet(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid pet ID." });
    const pet = await Pet.findById(req.params.id).lean();
    if (!pet) return res.status(404).json({ message: "Pet not found." });
    res.json({ pet });
  } catch (error) {
    next(error);
  }
}

async function createPet(req, res, next) {
  try {
    const pet = await Pet.create(req.validatedPet);
    res.status(201).json({ pet });
  } catch (error) {
    next(error);
  }
}

async function updatePet(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid pet ID." });
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.validatedPet, { new: true, runValidators: true });
    if (!pet) return res.status(404).json({ message: "Pet not found." });
    res.json({ pet });
  } catch (error) {
    next(error);
  }
}

async function deletePet(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid pet ID." });
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found." });
    await AdoptionRequest.deleteMany({ petId: pet._id });
    res.json({ message: "Pet listing and associated adoption requests deleted." });
  } catch (error) {
    next(error);
  }
}

module.exports = { listPets, getPet, createPet, updatePet, deletePet };
