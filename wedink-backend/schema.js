const Joi = require("joi");

// ── Listing ───────────────────────────────────────────────
const listingSchema = Joi.object({
  shopName: Joi.string().required(),
  description: Joi.string().allow("", null),
  location: Joi.string().allow("", null),
  country: Joi.string().allow("", null),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits.",
      "string.empty": "Phone number is required.",
    }),
});

// ── Review ────────────────────────────────────────────────
const reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required(),
});

// ── MarriageCard ──────────────────────────────────────────
const marriageCardSchema = Joi.object({
  cardName: Joi.string().required(),
  description: Joi.string().allow("", null),
  price: Joi.number().min(0).required(),
  theme: Joi.string().valid("Traditional", "Modern", "Royal").required(),
  material: Joi.string().valid("Paper", "Handmade", "Digital").required(),
  size: Joi.string().allow("", null),
});

// ── Booking ───────────────────────────────────────────────
const bookingSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits.",
      "string.empty": "Phone number is required.",
    }),
  customization: Joi.string().allow("").max(500).messages({
    "string.max": "Customization request should not exceed 500 characters.",
  }),
  quantity: Joi.number().integer().min(1).messages({
    "number.min": "Quantity must be at least 1.",
    "number.base": "Quantity must be a number.",
  }),
});

module.exports = { listingSchema, reviewSchema, marriageCardSchema, bookingSchema };
