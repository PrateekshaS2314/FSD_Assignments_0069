const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

async function authenticate(req, res, next) {
  const authorization = req.get("authorization") || "";
  const [scheme, token, extra] = authorization.split(" ");
  if (scheme !== "Bearer" || !token || extra) {
    return res.status(401).json({ message: "A valid Bearer token is required." });
  }
  if (!process.env.JWT_SECRET) return next(new Error("JWT_SECRET is required to verify authentication tokens."));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    if (!payload || typeof payload !== "object" || typeof payload.sub !== "string" || !mongoose.isValidObjectId(payload.sub)) {
      return res.status(401).json({ message: "Your session is invalid or has expired. Please sign in again." });
    }
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "This account is no longer available." });
    req.user = user;
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Your session is invalid or has expired. Please sign in again." });
    }
    return next(error);
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to access this resource." });
    }
    return next();
  };
}

module.exports = { authenticate, authorizeRoles };
