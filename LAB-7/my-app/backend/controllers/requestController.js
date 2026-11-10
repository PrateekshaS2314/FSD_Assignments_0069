const mongoose = require("mongoose");
const Pet = require("../models/Pet");
const AdoptionRequest = require("../models/AdoptionRequest");

async function listRequests(req, res, next) {
  try {
    const requests = await AdoptionRequest.find()
      .populate("petId", "petName animalType breed image adoptionStatus")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ requests });
  } catch (error) {
    next(error);
  }
}

async function getRequest(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid request ID." });
    const adoptionRequest = await AdoptionRequest.findById(req.params.id).populate("petId", "petName animalType breed image adoptionStatus").lean();
    if (!adoptionRequest) return res.status(404).json({ message: "Adoption request not found." });
    res.json({ request: adoptionRequest });
  } catch (error) {
    next(error);
  }
}

async function createRequest(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.validatedRequest.petId)) return res.status(400).json({ message: "Invalid pet ID." });
    const pet = await Pet.findById(req.validatedRequest.petId);
    if (!pet) return res.status(404).json({ message: "Pet not found." });
    if (pet.adoptionStatus !== "Available") return res.status(409).json({ message: "This pet is no longer available for adoption." });
    const adoptionRequest = await AdoptionRequest.create(req.validatedRequest);
    const stillAvailable = await Pet.exists({ _id: pet._id, adoptionStatus: "Available" });
    if (!stillAvailable) {
      await AdoptionRequest.findByIdAndDelete(adoptionRequest._id);
      return res.status(409).json({ message: "This pet is no longer available for adoption." });
    }
    res.status(201).json({ request: adoptionRequest });
  } catch (error) {
    next(error);
  }
}

async function updateRequest(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid request ID." });
    const adoptionRequest = await AdoptionRequest.findById(req.params.id);
    if (!adoptionRequest) return res.status(404).json({ message: "Adoption request not found." });

    if (req.validatedStatus === "Approved") {
      const pet = await Pet.findById(adoptionRequest.petId);
      if (!pet) return res.status(404).json({ message: "The pet for this request no longer exists." });
      if (pet.adoptionStatus !== "Adopted" || adoptionRequest.requestStatus !== "Approved") {
        const adoptedPet = await Pet.findOneAndUpdate(
          { _id: pet._id, adoptionStatus: "Available" },
          { adoptionStatus: "Adopted" },
          { new: true, runValidators: true }
        );
        if (!adoptedPet) return res.status(409).json({ message: "This pet has already been adopted." });
      }
      await AdoptionRequest.updateMany(
        { petId: pet._id, _id: { $ne: adoptionRequest._id }, requestStatus: "Pending" },
        { requestStatus: "Rejected" }
      );
    }

    adoptionRequest.requestStatus = req.validatedStatus;
    await adoptionRequest.save();
    res.json({ request: await adoptionRequest.populate("petId", "petName animalType breed image adoptionStatus") });
  } catch (error) {
    next(error);
  }
}

async function deleteRequest(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid request ID." });
    const adoptionRequest = await AdoptionRequest.findByIdAndDelete(req.params.id);
    if (!adoptionRequest) return res.status(404).json({ message: "Adoption request not found." });
    res.json({ message: "Adoption request deleted." });
  } catch (error) {
    next(error);
  }
}

module.exports = { listRequests, getRequest, createRequest, updateRequest, deleteRequest };
