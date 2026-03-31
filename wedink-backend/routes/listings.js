const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudconfig");
const upload = multer({ storage });

const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isOwner, isAuthor } = require("../middleware");
const { listingSchema, reviewSchema } = require("../schema");

// ── Validation middleware ─────────────────────────────────
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details.map((e) => e.message).join(", ") });
  }
  next();
};

// ── GET /listings ─────────────────────────────────────────
// Returns all listings; optionally filters by shopName query param
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { shopName } = req.query;
    let filter = {};
    if (shopName) {
      shopName = decodeURIComponent(shopName.trim());
      filter.shopName = new RegExp(shopName, "i");
    }

    const allListings = await Listing.find(filter);

    // Does the logged-in user already own a shop?
    const existingListing = await Listing.findOne({ owner: req.user._id });

    res.json({ allListings, existingListing });
  })
);

// ── POST /listings ────────────────────────────────────────
// Register a new shop (one per user)
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(async (req, res) => {
    const existingListing = await Listing.findOne({ owner: req.user._id });
    if (existingListing) {
      return res.status(400).json({ message: "You have already registered a shop." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, filename: req.file.filename };
    await newListing.save();

    res.status(201).json({ message: "Shop registered successfully!", listing: newListing });
  })
);


// ── GET /listings/:id ─────────────────────────────────────
router.get(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (!listing) {
      return res.status(404).json({ message: "Shop not found!" });
    }
    res.json({ listing });
  })
);

// ── PUT /listings/:id ─────────────────────────────────────
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, { new: true });

    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
      await listing.save();
    }

    res.json({ message: "Shop updated successfully!", listing });
  })
);

// ── DELETE /listings/:id ──────────────────────────────────
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Shop deleted successfully!" });
  })
);

// ════════════════════════════════════════════════════════════
//  REVIEWS (nested under /listings/:id/reviews)
// ════════════════════════════════════════════════════════════

// ── POST /listings/:id/reviews ────────────────────────────
router.post(
  "/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Shop not found!" });
    }

    const newReview = new Review(req.body);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    // Return the populated review so React can add it to UI immediately
    await newReview.populate("author", "username");
    res.status(201).json({ message: "Review added!", review: newReview });
  })
);

// ── DELETE /listings/:id/reviews/:reviewId ────────────────
router.delete(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted!" });
  })
);

module.exports = router;
