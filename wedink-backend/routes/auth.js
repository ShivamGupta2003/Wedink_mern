const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

// ── GET /auth/me ──────────────────────────────────────────
// React calls this on every page load to restore session state
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      user: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  }
  res.status(401).json({ user: null });
});

// ── POST /auth/signup ─────────────────────────────────────
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login after signup failed." });
      }
      return res.status(201).json({
        message: "Welcome to WedInk!",
        user: {
          _id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
        },
      });
    });
  })
);

// ── POST /auth/login ──────────────────────────────────────
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        message: info?.message || "Invalid username or password.",
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: "Welcome To WedInk! You are logged in.",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    });
  })(req, res, next);
});

// ── GET /auth/logout ──────────────────────────────────────
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "You are logged out successfully!" });
  });
});

module.exports = router;
