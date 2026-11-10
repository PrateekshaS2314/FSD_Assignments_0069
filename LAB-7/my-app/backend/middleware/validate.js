const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const petFields = ["petName", "animalType", "breed", "age", "gender", "description", "image", "location", "adoptionStatus"];

function validatePet(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return res.status(400).json({ message: "Request body must be a JSON object." });

  const errors = {};
  const required = ["petName", "animalType", "breed", "age", "gender", "description", "location"];
  for (const field of required) {
    if (body[field] === undefined || body[field] === null || String(body[field]).trim() === "") errors[field] = "This field is required.";
  }
  for (const field of ["petName", "animalType", "breed", "gender", "description", "image", "location", "adoptionStatus"]) {
    if (body[field] !== undefined && typeof body[field] !== "string") errors[field] = "Must be text.";
  }
  if (body.animalType !== undefined && !["Dog", "Cat", "Other"].includes(body.animalType)) errors.animalType = "Choose Dog, Cat, or Other.";
  if (body.gender !== undefined && !["Male", "Female", "Unknown"].includes(body.gender)) errors.gender = "Choose Male, Female, or Unknown.";
  if (body.adoptionStatus !== undefined && !["Available", "Adopted"].includes(body.adoptionStatus)) errors.adoptionStatus = "Choose Available or Adopted.";
  if (body.age !== undefined && (
    !["number", "string"].includes(typeof body.age) ||
    String(body.age).trim() === "" ||
    !Number.isFinite(Number(body.age)) ||
    Number(body.age) < 0 ||
    Number(body.age) > 100
  )) errors.age = "Enter an age from 0 to 100.";
  if (typeof body.image === "string" && body.image.trim() && !/^https?:\/\/\S+$/i.test(body.image.trim())) errors.image = "Enter a valid http or https image URL.";
  if (Object.keys(errors).length) return res.status(400).json({ message: "Please correct the highlighted fields.", errors });

  req.validatedPet = Object.fromEntries(petFields.filter((field) => body[field] !== undefined).map((field) => [field, field === "age" ? Number(body[field]) : body[field]]));
  next();
}

function validateAdoptionRequest(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return res.status(400).json({ message: "Request body must be a JSON object." });

  const errors = {};
  for (const field of ["petId", "applicantName", "email", "phone", "message"]) {
    if (body[field] === undefined || body[field] === null || String(body[field]).trim() === "") errors[field] = "This field is required.";
    else if (typeof body[field] !== "string") errors[field] = "Must be text.";
  }
  if (typeof body.email === "string" && !emailPattern.test(body.email.trim())) errors.email = "Enter a valid email address.";
  if (Object.keys(errors).length) return res.status(400).json({ message: "Please correct the highlighted fields.", errors });

  req.validatedRequest = {
    petId: body.petId.trim(),
    applicantName: body.applicantName.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    message: body.message.trim()
  };
  next();
}

function validateRequestStatus(req, res, next) {
  const { requestStatus } = req.body || {};
  if (!["Pending", "Approved", "Rejected"].includes(requestStatus)) {
    return res.status(400).json({ message: "requestStatus must be Pending, Approved, or Rejected." });
  }
  req.validatedStatus = requestStatus;
  next();
}

module.exports = { validatePet, validateAdoptionRequest, validateRequestStatus };
