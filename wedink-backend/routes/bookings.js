const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing");
const MarriageCard = require("../models/marriageCard");
const Booking = require("../models/booking");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isBookingOwnerOrShopOwner } = require("../middleware");
const { bookingSchema } = require("../schema");

// ── Validation middleware ─────────────────────────────────
const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// ════════════════════════════════════════════════════════════
//  BOOKING FORM DATA
// ════════════════════════════════════════════════════════════

// ── GET /listings/:id/Mcard/:cardId/book ──────────────────
// Returns data needed to render the booking form in React
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id, cardId } = req.params;
    const listing = await Listing.findById(id);
    const marriageCard = await MarriageCard.findById(cardId);

    if (!listing || !marriageCard) {
      return res.status(404).json({ message: "Shop or Card not found!" });
    }
    res.json({ listing, marriageCard });
  })
);

// ── POST /listings/:id/Mcard/:cardId/book ─────────────────
// Place a new booking
// router.post(
//   "/",
//   isLoggedIn,
//   validateBooking,
//   wrapAsync(async (req, res) => {
//     const { id, cardId } = req.params;
//     const listing = await Listing.findById(id);
//     const marriageCard = await MarriageCard.findById(cardId);

//     if (!listing || !marriageCard) {
//       return res.status(404).json({ message: "Shop or Card not found!" });
//     }

//     const booking = new Booking({
//       user: req.user._id,
//       marriageCard: cardId,
//       shop: id,
//       phoneNumber: req.body.phoneNumber,
//       customization: req.body.customization || "",
//       quantity: req.body.quantity || 1,
//       status: "Pending",
//     });

//     await booking.save();
//     res.status(201).json({
//       message: "Booking successful! Shop owner will contact you.",
//       booking,
//     });
//   })
// );


router.post(
  "/",
  isLoggedIn,
  validateBooking,
  wrapAsync(async (req, res) => {
    const { id, cardId } = req.params;

    const listing = await Listing.findById(id);
    const marriageCard = await MarriageCard.findById(cardId);

    if (!listing || !marriageCard) {
      return res.status(404).json({ message: "Shop or Card not found!" });
    }

    const quantity = req.body.quantity || 1;

    // ✅ Calculate total price
    const totalAmount = quantity * (marriageCard.price || 0);

    const booking = new Booking({
      user: req.user._id,
      marriageCard: cardId,
      shop: id,
      phoneNumber: req.body.phoneNumber,
      customization: req.body.customization || "",
      quantity: quantity,
      status: "Pending",

      // ✅ IMPORTANT LINE
      dueAmount: totalAmount,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful! Shop owner will contact you.",
      booking,
    });
  })
);

// ════════════════════════════════════════════════════════════
//  USER BOOKINGS  — /users/bookings
//  (These are mounted separately in app.js, not under /listings)
// ════════════════════════════════════════════════════════════

// ── GET /users/bookings ───────────────────────────────────
// All bookings for the logged-in user
router.get(
  "/user",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("marriageCard")
      .populate("shop");
    res.json({ bookings });
  })
);

// ════════════════════════════════════════════════════════════
//  SHOP ORDERS  — /listings/:id/orders
// ════════════════════════════════════════════════════════════

// ── GET /listings/:id/orders ──────────────────────────────
// All bookings for a shop (shop owner only)
router.get(
  "/shop/:shopId/orders",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const shop = await Listing.findById(req.params.shopId);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found!" });
    }
    if (!shop.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "You are not authorized to view these orders." });
    }

    const bookings = await Booking.find({ shop: req.params.shopId })
      .populate("marriageCard")
      .populate("user");

    res.json({ bookings, shop });
  })
);

// ── PUT /listings/:id/orders/:bookingId ───────────────────
// Shop owner updates booking status
// router.put(
//   "/shop/:shopId/orders/:bookingId",
//   isLoggedIn,
//   wrapAsync(async (req, res) => {
//     const { shopId, bookingId } = req.params;
//     const { status } = req.body;

//     const booking = await Booking.findById(bookingId).populate("shop");
//     if (!booking || !booking.shop._id.equals(shopId)) {
//       return res.status(404).json({ message: "Booking not found." });
//     }
//     if (!booking.shop.owner.equals(req.user._id)) {
//       return res.status(403).json({ message: "You do not have permission to update this booking." });
//     }

//     booking.status = status;
//     await booking.save();
//     res.json({ message: "Booking status updated.", booking });
//   })
// );


router.put(
  "/shop/:shopId/orders/:bookingId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { shopId, bookingId } = req.params;
    const { status, dueAmount } = req.body; // 👈 extract dueAmount too

    const booking = await Booking.findById(bookingId).populate("shop");
    if (!booking || !booking.shop._id.equals(shopId)) {
      return res.status(404).json({ message: "Booking not found." });
    }
    if (!booking.shop.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "You do not have permission to update this booking." });
    }

    // 👇 Only update fields that were actually sent
    if (status !== undefined)    booking.status    = status;
    if (dueAmount !== undefined) booking.dueAmount = dueAmount;

    await booking.save();
    res.json({ message: "Booking updated.", booking });
  })
);
// ── DELETE /listings/:id/orders/:bookingId ────────────────
// Shop owner OR booking user can delete
router.delete(
  "/shop/:shopId/orders/:bookingId",
  isLoggedIn,
  isBookingOwnerOrShopOwner,
  wrapAsync(async (req, res) => {
    const { bookingId, shopId } = req.params;
    const booking = await Booking.findById(bookingId).populate("shop");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    const isShopOwner = booking.shop.owner.equals(req.user._id);
    await Booking.findByIdAndDelete(bookingId);

    res.json({
      message: "Booking deleted successfully.",
      redirectTo: isShopOwner ? `/listings/${shopId}/orders` : "/users/bookings",
    });
  })
);

module.exports = router;
