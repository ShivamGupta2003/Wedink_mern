const mongoose = require("mongoose");

const initdatac = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wedink_db";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initdb = async () => {
  await Listing.insertMany(initdatac.data);

  console.log("data initialised successfully ");
};

initdb();
