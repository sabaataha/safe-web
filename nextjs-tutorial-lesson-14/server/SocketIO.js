const socketIo = require('socket.io');


const connectSocket = async (server) => {
    try {
        
        const io = socketIo(server);
        const userAnswers = {}
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
        const { userId, questionId, selectedOption } = data;
    
        if (!userAnswers[userId]) {
            userAnswers[userId] = {};
        }
        userAnswers[userId][questionId] = selectedOption;
        console.log('User answers:', userAnswers);
        });
    
    });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  module.exports = connectSocket;
  