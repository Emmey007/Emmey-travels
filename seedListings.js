require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

const departure = new Date("2026-09-01");
const returnDate = new Date("2026-09-10");

const listings = [
  {
    title: "Santorini Escape",
    type: "boat-cruise",
    origin: "Lagos",
    destination: "Santorini",
    continent: "Europe",
    departureDate: departure,
    returnDate,
    duration: "10 Days",
    price: 4500000,
    currency: "NGN",
    seatsAvailable: 50,
    image: "/images/santorini.jpg",
    description:
      "Famous for its whitewashed buildings, blue-domed churches and breathtaking sunsets.",
  },
  {
    title: "Dubai Luxury Tour",
    type: "flight",
    origin: "Lagos",
    destination: "Dubai",
    continent: "Asia",
    departureDate: departure,
    returnDate,
    duration: "7 Days",
    price: 3800000,
    currency: "NGN",
    seatsAvailable: 80,
    image: "/images/dubai.jpg",
    description: "Luxury shopping, skyscrapers and desert adventures.",
  },
  {
    title: "Paris Experience",
    type: "flight",
    origin: "Lagos",
    destination: "Paris",
    continent: "Europe",
    departureDate: departure,
    returnDate,
    duration: "8 Days",
    price: 5200000,
    currency: "NGN",
    seatsAvailable: 60,
    image: "/images/paris.jpg",
    description: "Visit the Eiffel Tower, Louvre Museum and enjoy Parisian cafés.",
  },
  {
    title: "Maldives Getaway",
    type: "boat-cruise",
    origin: "Lagos",
    destination: "Maldives",
    continent: "Asia",
    departureDate: departure,
    returnDate,
    duration: "6 Days",
    price: 6000000,
    currency: "NGN",
    seatsAvailable: 30,
    image: "/images/maldives.jpg",
    description: "Crystal-clear waters and luxury overwater villas.",
  },
  {
    title: "Bali Adventure",
    type: "flight",
    origin: "Lagos",
    destination: "Bali",
    continent: "Asia",
    departureDate: departure,
    returnDate,
    duration: "8 Days",
    price: 3200000,
    currency: "NGN",
    seatsAvailable: 70,
    image: "/images/bali.jpg",
    description: "Beautiful temples, beaches and rice terraces.",
  },
  {
    title: "Tokyo Explorer",
    type: "flight",
    origin: "Lagos",
    destination: "Tokyo",
    continent: "Asia",
    departureDate: departure,
    returnDate,
    duration: "7 Days",
    price: 4800000,
    currency: "NGN",
    seatsAvailable: 90,
    image: "/images/tokyo.jpg",
    description: "Experience futuristic Japan and traditional culture.",
  },
  {
    title: "Cape Town Tour",
    type: "flight",
    origin: "Lagos",
    destination: "Cape Town",
    continent: "Africa",
    departureDate: departure,
    returnDate,
    duration: "5 Days",
    price: 1500000,
    currency: "NGN",
    seatsAvailable: 45,
    image: "/images/capeTown.jpg",
    description: "Table Mountain, beaches and wine estates.",
  },
  {
    title: "New York Experience",
    type: "flight",
    origin: "Lagos",
    destination: "New York",
    continent: "Americas",
    departureDate: departure,
    returnDate,
    duration: "9 Days",
    price: 10000000,
    currency: "NGN",
    seatsAvailable: 100,
    image: "/images/newYork.jpg",
    description: "Visit Times Square, Central Park and the Statue of Liberty.",
  },
  {
    title: "Venice Cruise",
    type: "ship-cruise",
    origin: "Lagos",
    destination: "Venice",
    continent: "Europe",
    departureDate: departure,
    returnDate,
    duration: "7 Days",
    price: 5000000,
    currency: "NGN",
    seatsAvailable: 40,
    image: "/images/venice.jpg",
    description: "Romantic gondola rides through Venice canals.",
  },
  {
    title: "Zanzibar Escape",
    type: "boat-cruise",
    origin: "Lagos",
    destination: "Zanzibar",
    continent: "Africa",
    departureDate: departure,
    returnDate,
    duration: "5 Days",
    price: 900000,
    currency: "NGN",
    seatsAvailable: 55,
    image: "/images/zanzibar.jpg",
    description: "White sandy beaches and turquoise waters.",
  },
  {
    title: "Golden Night City",
    type: "flight",
    origin: "Lagos",
    destination: "Addis Ababa",
    continent: "Africa",
    departureDate: departure,
    returnDate,
    duration: "6 Days",
    price: 800000,
    currency: "NGN",
    seatsAvailable: 60,
    image: "/images/ethopia.jpg",
    description: "Experience Ethiopia's culture and vibrant nightlife.",
  },
  {
    title: "Greenland Arctic Adventure",
    type: "ship-cruise",
    origin: "Lagos",
    destination: "Greenland",
    continent: "Americas",
    departureDate: departure,
    returnDate,
    duration: "12 Days",
    price: 1700000,
    currency: "NGN",
    seatsAvailable: 20,
    image: "/images/greenland.jpg",
    description: "Explore glaciers, fjords and the Northern Lights.",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Connected to MongoDB");

    await Listing.deleteMany({});
    console.log("🗑 Existing listings deleted");

    await Listing.insertMany(listings);
    console.log(`✅ ${listings.length} listings inserted successfully`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();