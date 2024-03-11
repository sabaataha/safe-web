const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const connectSocket = require('./SocketIO');
const http = require('http');


const connectDB = require("./ConnectDB");
const app = express();
const server = http.createServer(app);


connectDB();
connectSocket(server);

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
