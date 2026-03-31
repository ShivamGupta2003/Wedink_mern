const Listing = require("./models/listing");
const Review = require("./models/review");
const Booking = require("./models/booking");

// ── Auth guard ────────────────────────────────────────────
// Returns 401 JSON instead of redirecting (React will handle redirect)
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be logged in first." });
  }
  next();
};

// ── Shop owner guard ──────────────────────────────────────
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ message: "Shop not found." });
  }
  if (!listing.owner.equals(req.user._id)) {
    return res.status(403).json({ message: "You do not have permission to do this." });
  }
  next();
};

// ── Review author guard ───────────────────────────────────
module.exports.isAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review not found." });
  }
  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({ message: "You do not have permission to do this." });
  }
  next();
};

// ── Marriage card owner guard (shop owner only) ───────────
module.exports.ismcard = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ message: "Shop not found." });
  }
  if (!listing.owner.equals(req.user._id)) {
    return res.status(403).json({ message: "You do not have permission to do this." });
  }
  next();
};

// ── Booking: owner or shop owner can delete ───────────────
module.exports.isBookingOwnerOrShopOwner = async (req, res, next) => {
  const { id, bookingId } = req.params;
  const userId = req.user._id;

  const booking = await Booking.findById(bookingId).populate("shop");
  if (!booking) {
    return res.status(404).json({ message: "Booking not found." });
  }

  const isShopOwner = booking.shop.owner.equals(userId);
  const isBookingUser = booking.user.equals(userId);

  if (!isShopOwner && !isBookingUser) {
    return res.status(403).json({ message: "You do not have permission to do this." });
  }
  next();
};
