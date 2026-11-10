const mongoose = require("mongoose");

const adoptionRequestSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true, index: true },
  applicantName: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  requestStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending", required: true }
}, { timestamps: true });

module.exports = mongoose.model("AdoptionRequest", adoptionRequestSchema);
