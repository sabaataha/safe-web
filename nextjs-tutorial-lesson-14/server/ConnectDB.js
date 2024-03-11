const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const mongoDbUrl = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongoDbUrl);
    console.log(`Mongo db connected: ${connect.connection.host}`);
    // db.Weather.WeatherCard.drop();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
