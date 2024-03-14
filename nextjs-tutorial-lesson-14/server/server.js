const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const connectSocket = require('./SocketIO');
const http = require('http');
require("dotenv").config();

const connectDB = require("./ConnectDB");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(require("cors")());

//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/gameroom", require("./routes/gameroom"));

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
// app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}


connectDB();

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//bring in the models:
require("./models/User");
require("./models/Gameroom");

const server = http.createServer(app);
connectSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
