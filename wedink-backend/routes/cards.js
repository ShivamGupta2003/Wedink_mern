

const express = require("express");
const router = express.Router({ mergeParams: true });

const multer = require("multer");
const { storage } = require("../cloudconfig");
const upload = multer({ storage });

const Listing = require("../models/listing");
const MarriageCard = require("../models/marriageCard");

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, ismcard } = require("../middleware");
const { marriageCardSchema } = require("../schema");


// ── VALIDATION MIDDLEWARE ───────────────────────────────
const validateMarriageCard = (req, res, next) => {
  const { error } = marriageCardSchema.validate(req.body.marriageCard);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};


// ── GET ALL CARDS OF A SHOP ─────────────────────────────
// GET /listings/:id/Mcard
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const shop = await Listing.findById(req.params.id)
      .populate("marriageCards")
      .populate("owner");

    if (!shop) {
      return res.status(404).json({ message: "Shop not found!" });
    }

    res.json({
      shop,
      marriageCards: shop.marriageCards,
    });
  })
);


// ── CREATE NEW CARD ─────────────────────────────────────
// POST /listings/:id/Mcard
router.post(
  "/",
  isLoggedIn,
  ismcard,
  upload.single("image"),
  validateMarriageCard,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Shop not found!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Card image is required." });
    }

    // ✅ FIX: use marriageCard object
    const newCard = new MarriageCard(req.body.marriageCard);

    newCard.image = {
      url: req.file.path,
      filename: req.file.filename,
    };

    newCard.shop = req.params.id;

    listing.marriageCards.push(newCard);

    await newCard.save();
    await listing.save();

    res.status(201).json({
      message: "Marriage card added!",
      card: newCard,
    });
  })
);


// ── GET SINGLE CARD ─────────────────────────────────────
// GET /listings/:id/Mcard/:cardId
router.get("/:cardId", isLoggedIn, wrapAsync(async (req, res) => {
  const { cardId } = req.params;
  console.log("PARAMS:", req.params);

  if (!cardId || cardId === "undefined") {
    return res.status(400).json({ message: "Invalid card ID" });
  }

  const listing = await Listing.findById(req.params.id).populate("owner");
  const marriageCard = await MarriageCard.findById(cardId);

  if (!listing) {
    return res.status(404).json({ message: "Shop not found!" });
  }

  if (!marriageCard) {
    return res.status(404).json({ message: "Card not found!" });
  }

  res.json({ listing, marriageCard });
}));


// ── UPDATE CARD ─────────────────────────────────────────
// PUT /listings/:id/Mcard/:cardId
router.put(
  "/:cardId",
  isLoggedIn,
  ismcard,
  upload.single("image"),
  validateMarriageCard,
  wrapAsync(async (req, res) => {
    const marriageCard = await MarriageCard.findById(req.params.cardId);

    if (!marriageCard) {
      return res.status(404).json({ message: "Card not found!" });
    }

    // ✅ FIX: update using marriageCard object
    Object.assign(marriageCard, req.body.marriageCard);

    // update image if new uploaded
    if (req.file) {
      marriageCard.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await marriageCard.save();

    res.json({
      message: "Card updated!",
      card: marriageCard,
    });
  })
);


// ── DELETE CARD ─────────────────────────────────────────
// DELETE /listings/:id/Mcard/:cardId
router.delete(
  "/:cardId",
  isLoggedIn,
  ismcard,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Shop not found!" });
    }

    await Listing.findByIdAndUpdate(req.params.id, {
      $pull: { marriageCards: req.params.cardId },
    });

    const deletedCard = await MarriageCard.findByIdAndDelete(req.params.cardId);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found!" });
    }

    res.json({
      message: "Card deleted!",
    });
  })
);


module.exports = router;