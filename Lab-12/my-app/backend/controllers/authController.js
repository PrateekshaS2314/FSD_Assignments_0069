const jwt = require("jsonwebtoken");
const User = require("../models/User");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
});

function validateRegistration(body = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) body = {};
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (name.length < 2 || name.length > 80) errors.name = "Name must be between 2 and 80 characters.";
  if (email.length > 254 || !emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) errors.password = "Password must be at least 8 characters and no more than 72 bytes.";
  return { errors, name, email, password };
}

function createToken(user) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required to issue authentication tokens.");
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1d"
  });
}

async function register(req, res, next) {
  const { errors, name, email, password } = validateRegistration(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ message: "Please correct the highlighted fields.", errors });

  try {
    if (await User.exists({ email })) return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ name, email, password });
    return res.status(201).json({ message: "Your account has been created.", user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "An account with this email already exists." });
    return next(error);
  }
}

async function login(req, res, next) {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!emailPattern.test(email) || password.length === 0 || Buffer.byteLength(password, "utf8") > 72) {
    return res.status(400).json({ message: "Enter a valid email address and password." });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    return res.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
}

function profile(req, res) {
  res.json({ user: publicUser(req.user) });
}

function adminDashboard(req, res) {
  res.json({ message: "Admin access confirmed.", user: publicUser(req.user) });
}

module.exports = { register, login, profile, adminDashboard };
