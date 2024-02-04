// pages/api/questions.js
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
  
  export default function handler(req, res) {
    res.status(200).json(questions);
  }
  