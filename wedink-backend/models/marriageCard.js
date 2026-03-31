const mongoose = require("mongoose");

const marriageCardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  theme: {
    type: String,
    enum: ["Traditional", "Modern", "Royal"],
    required: true,
  },
  material: {
    type: String,
    enum: ["Paper", "Handmade", "Digital"],
    required: true,
  },
  size: String,
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
});

module.exports = mongoose.model("MarriageCard", marriageCardSchema);
