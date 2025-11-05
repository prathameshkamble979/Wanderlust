const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js")

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

main()
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    const listingsWithOwner = data.data.map((obj) => ({
        ...obj,
        owner: "68e93cef27e7960e56b09d4b"
    }));

    await Listing.insertMany(listingsWithOwner); 
    console.log("Data was initialized");
}

initDB();
