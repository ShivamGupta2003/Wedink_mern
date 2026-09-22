const mongoose = require("mongoose");
const initdatac = require("./mcard.js");
const MarriageCard = require("../models/marriageCard.js");
const Listing = require("../models/listing.js");

const MONGO_URL =
  "mongodb://127.0.0.1:27017/wedink_db";

// MongoDB Connection Setup
main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.error("❌ Connection Error:", err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initdb = async () => {
  try {
    for (let card of initdatac.data) {
      let listing = await Listing.findById(card.shop);
      if (!listing) {
        console.log(`⚠️ Shop ID not found: ${card.shop}`);
        continue;
      }

      let newCard = new MarriageCard(card);
      await newCard.save();

      listing.marriageCards.push(newCard._id);
      await listing.save();

      console.log(`✅ Inserted: ${newCard.cardName}`);
    }

    console.log("🎉 Data initialized successfully!");
  } catch (err) {
    console.error("❌ Seeding Error:", err);
  } finally {
    mongoose.connection.close();
  }
};

initdb();
