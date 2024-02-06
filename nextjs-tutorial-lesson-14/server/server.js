const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import cors library
const { emit } = require("process");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(cors()); // Enable CORS for all requests
app.use(express.json());

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  console.log(socket.id);

  // // add user to data 
  //  socket.on("join", async ({ name,isTeacher  }, callback) => {
  //   const { error, user } = addUser({ id: socket.id, isTeacher});

  //   if (error) return callback({ error: error });   
  //     addPlayer({ id: socket.id, name});
  // });

 // Handle "nextQuestion" event from teacher
 socket.on('nextQuestion', (nextQuestionIndex) => {
  console.log('Teacher is moving to the next question:', nextQuestionIndex);
  io.emit('moveToNextQuestion', nextQuestionIndex);
});

socket.on('disconnect', () => {
  console.log('User disconnected');
});

socket.on('submitAnswer', (data) => {
  console.log('Received answer submission from user:', data);
  io.emit('answerSubmitted', data);
});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
