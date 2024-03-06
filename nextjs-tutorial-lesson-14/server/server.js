const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  console.log(socket.id);

  socket.on('nextQuestion', (nextQuestionIndex) => {
    console.log('Teacher is moving to the next question:', nextQuestionIndex);
    io.emit('moveToNextQuestion', nextQuestionIndex); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('submitAnswer', (data) => {
    console.log('Received answer submission from user:', data);
    io.emit('answerSubmitted', data); // Broadcast to all clients
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
