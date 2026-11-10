const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  petName: { type: String, required: true, trim: true, maxlength: 80 },
  animalType: { type: String, required: true, enum: ["Dog", "Cat", "Other"] },
  breed: { type: String, required: true, trim: true, maxlength: 100 },
  age: { type: Number, required: true, min: 0, max: 100 },
  gender: { type: String, required: true, enum: ["Male", "Female", "Unknown"] },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  image: { type: String, trim: true, maxlength: 2048, default: "" },
  location: { type: String, required: true, trim: true, maxlength: 160 },
  adoptionStatus: { type: String, enum: ["Available", "Adopted"], default: "Available", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Pet", petSchema);
