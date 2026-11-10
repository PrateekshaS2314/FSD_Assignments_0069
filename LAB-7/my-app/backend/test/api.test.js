const { after, before, test } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const app = require("../server");
const Pet = require("../models/Pet");
const AdoptionRequest = require("../models/AdoptionRequest");
const { validatePet, validateAdoptionRequest } = require("../middleware/validate");

let server;
let baseUrl;

const validPet = {
  petName: "Maple",
  animalType: "Dog",
  breed: "Mixed breed",
  age: 2,
  gender: "Female",
  description: "A playful, affectionate friend who loves long walks.",
  image: "",
  location: "Happy Tails Shelter"
};

function runMiddleware(middleware, req) {
  let responseStatus = 200;
  let responseBody;
  let continued = false;
  middleware(req, {
    status(status) {
      responseStatus = status;
      return this;
    },
    json(body) {
      responseBody = body;
    }
  }, () => { continued = true; });
  return { responseStatus, responseBody, continued, req };
}

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test("health endpoint reports PawConnect API status", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).service, "pawconnect-api");
});

test("undefined routes return a JSON 404", async () => {
  const response = await fetch(`${baseUrl}/api/not-a-route`);
  assert.equal(response.status, 404);
  assert.equal((await response.json()).message, "Route not found.");
});

test("pet validation rejects incomplete and invalid pet data", async () => {
  const response = await fetch(`${baseUrl}/api/pets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ petName: "", animalType: "Bird", age: -1 })
  });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.ok(body.errors.petName);
  assert.ok(body.errors.animalType);
  assert.ok(body.errors.age);
});

test("pet list rejects unsupported filter values", async () => {
  const response = await fetch(`${baseUrl}/api/pets?animalType=Bird`);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, "animalType must be Dog, Cat, or Other.");
});

test("adoption request validation rejects invalid email and missing consent message", async () => {
  const response = await fetch(`${baseUrl}/api/requests`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ petId: "123", applicantName: "Alex", email: "not-an-email", phone: "555-0100", message: "" })
  });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.ok(body.errors.email);
  assert.ok(body.errors.message);
});

test("request status endpoint validates its status before database access", async () => {
  const response = await fetch(`${baseUrl}/api/requests/507f1f77bcf86cd799439011`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ requestStatus: "Maybe" })
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, "requestStatus must be Pending, Approved, or Rejected.");
});

test("malformed JSON receives a client error", async () => {
  const response = await fetch(`${baseUrl}/api/pets`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{"
  });
  assert.equal(response.status, 400);
});

test("valid pet fields pass validation and normalize age to a number", () => {
  const result = runMiddleware(validatePet, { body: { ...validPet, age: "2.5" } });
  assert.equal(result.continued, true);
  assert.equal(result.req.validatedPet.age, 2.5);
  assert.equal(result.req.validatedPet.adoptionStatus, undefined);
});

test("pet age rejects non-numeric JSON values", () => {
  const result = runMiddleware(validatePet, { body: { ...validPet, age: true } });
  assert.equal(result.continued, false);
  assert.equal(result.responseStatus, 400);
  assert.equal(result.responseBody.errors.age, "Enter an age from 0 to 100.");
});

test("valid adoption application is normalized before it reaches the controller", () => {
  const result = runMiddleware(validateAdoptionRequest, {
    body: { petId: new mongoose.Types.ObjectId().toString(), applicantName: " Alex ", email: "ALEX@example.com", phone: "555-0100", message: "We have a sunny home." }
  });
  assert.equal(result.continued, true);
  assert.equal(result.req.validatedRequest.applicantName, "Alex");
  assert.equal(result.req.validatedRequest.email, "alex@example.com");
});

test("Mongoose models enforce the documented pet and request enums", () => {
  assert.equal(new Pet(validPet).validateSync(), undefined);
  const invalidPet = new Pet({ ...validPet, animalType: "Bird", adoptionStatus: "Pending" }).validateSync();
  assert.ok(invalidPet.errors.animalType);
  assert.ok(invalidPet.errors.adoptionStatus);

  const validRequest = new AdoptionRequest({
    petId: new mongoose.Types.ObjectId(),
    applicantName: "Alex",
    email: "alex@example.com",
    phone: "555-0100",
    message: "We have a sunny home."
  });
  assert.equal(validRequest.validateSync(), undefined);
  assert.equal(validRequest.requestStatus, "Pending");
});
