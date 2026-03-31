const mongoose = require("mongoose");
const Review = require("./review");

const listingSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  location: String,
  country: String,
  phoneNumber: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  marriageCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MarriageCard",
    },
  ],
});

// Cascade delete reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
