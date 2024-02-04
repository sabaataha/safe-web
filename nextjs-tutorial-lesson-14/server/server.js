const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const questions = [
  {
    id: 1,
    question: 'What is a crucial aspect of consent in a relationship?',
    options: ['Verbal communication', 'Ignoring signals', 'Assuming consent','Peer pressure'],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'How can one effectively communicate boundaries in a relationship?',
    options: ['Open and honest communication', 'Keeping silent', 'Assuming the other person knows','Using body language only'],
    correctAnswer: 0,
  },
    // Todo - add more questions
];

app.get('/questions', (req, res) => {
  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
